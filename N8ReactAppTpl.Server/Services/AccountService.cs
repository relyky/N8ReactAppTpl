using DTO.Account;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using N8ReactAppTpl.Server.Models;
using Reinforced.Typings.Attributes;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace N8ReactAppTpl.Server.Services;

/// <summary>
/// 登入授權服務
/// ※ 需搭配 Singleton Injection。
/// </summary>
public class AccountService(ILogger<AccountService> _logger, IConfiguration _config, IHttpContextAccessor _http, IMemoryCache _cache)
{
  // use to lock
  readonly object _lockObj = new object();

  /// <summary>
  /// 認證檢查
  /// </summary>
  internal bool Authenticate(LoginArgs ln)
  {
    try
    {
      if (String.IsNullOrWhiteSpace(ln.UserId))
        throw new ApplicationException("登入認證失敗！");

      if (String.IsNullOrWhiteSpace(ln.Credential))
        throw new ApplicationException("登入認證失敗！");

      //## verify vcode;
      if (!"123456".Equals(ln.Vcode))
        throw new ApplicationException("登入認證失敗！");

      //## 驗證帳號與密碼
      ////# 再用新光的AD驗證
      //if (!"ByPassAD".Equals(_config["ADByPass"]))
      //{
      //  string ldapHost = _config["ADHost"];
      //  if (!ADAuthenticate(ldapHost, ln.userId, ln.credential))
      //    throw new ApplicationException("登入認證失敗！");
      //}
      //else
      //{
      //  _logger.WarnEx($"登入認證時跳過AD驗證，帳號：{ln.userId}。");
      //}

      //## 帳號特例:測試
      if (ln.UserId == "smart" || ln.UserId == "beauty")
        return true;

      // 預設失敗
      throw new ApplicationException("登入認證失敗！");
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, $"Authenticate FAIL, userId:{ln.UserId}.");
      return false;
    }
  }

  /// <summary>
  /// 取得授權資料，並存入授權資料緩存區。
  /// </summary>
  internal AuthUser? Authorize(string userId)
  {
    try
    {
      if (string.IsNullOrWhiteSpace(userId))
        throw new ArgumentNullException(nameof(userId));

      double expiresMinutes = _config.GetValue<double>("JwtSettings:ExpireMinutes");

      #region # 取登入者來源IP
      string clientIp = "無法取得來源IP";
      string hostName = "無法識別或失敗";
      try
      {
        IPAddress? remoteIp = _http.HttpContext?.Connection.RemoteIpAddress;
        if (remoteIp != null)
        {
          clientIp = remoteIp.ToString();
          hostName = Dns.GetHostEntry(remoteIp).HostName;
        }
      }
      catch
      {
        // 預防取不到IP/HostName當掉。
      }
      #endregion

      ///
      ///※ 可以進來執行表示身份驗證已成功。這裡只處理取得授權能力。
      ///

      AuthUser? authUser = null;

      #region ## 帳號特例：內定系統管理員
      if (userId == "smart")
      {
        authUser = new AuthUser
        {
          UserId = "smart",
          UserName = "郝聰明",
          Roles = new string[] { "user" },
          AuthGuid = Guid.NewGuid(),
          IssuedUtc = DateTimeOffset.UtcNow,
          ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(expiresMinutes),
          ClientIp = clientIp,
          AuthMenu = new MenuInfo()
        };

        authUser.AuthMenu.AddMenuGroup(new MenuGroup { groupId = "DEMO", groupName = "測試功能" })
            .AddMenuItem(new MenuItem { funcId = "DEMO01", funcName = "系統與環境參數", url = "/demo01" })
            .AddMenuItem(new MenuItem { funcId = "DEMO02", funcName = "Redux Counter", url = "/demo02" })
            .AddMenuItem(new MenuItem { funcId = "DEMO03", funcName = "Material UI 展示", url = "/demo03" })
            .AddMenuItem(new MenuItem { funcId = "DEMO04", funcName = "通訊測試", url = "/demo04" });
      }

      #endregion

      //## 取得授權
      //AuthUser? authUser = AuthModule.GetUserAuthz(userId, "SSO"); // config["SystemID"]

      if (authUser == null)
        throw new ArgumentNullException(nameof(authUser));

      lock (_lockObj)
      {
        ///※ 授權資料建議存入Database，可用 MemoryCache 加速。
        //## 一個人只能在一個位置登入
        _cache.Set<AuthUser>($"AuthPool:{authUser.UserId}", authUser, TimeSpan.FromMinutes(expiresMinutes));
      }

      // success
      //※ 正常來說授權不會失敗！
      _logger.LogInformation($"Authorize SUCCESS, userId:{authUser.UserId}.");
      return authUser;
    }
    catch (Exception ex)
    {
      _logger.LogError($"Authorize FAIL, userId:{userId}.", ex);
      return null;
    }
  }

  /// <summary>
  /// 依授權資料生成權杖
  /// </summary>
  internal string GenerateJwtToken(AuthUser auth)
  {
    var jwtTool = new JwtAuthenticationTool(_config);

    // PackUserClaimsData
    ClaimsIdentity userIdentity = new();
    userIdentity.AddClaim(new Claim(ClaimTypes.Name, auth.UserId));
    userIdentity.AddClaim(new Claim(ClaimTypes.GivenName, auth.UserName));
    userIdentity.AddClaim(new Claim(ClaimTypes.Sid, auth.AuthGuid.ToString()));
    userIdentity.AddClaims(auth.Roles.Select(role => new Claim(ClaimTypes.Role, role)));

    string jwtToken = jwtTool.MakeToken(userIdentity, auth.ExpiresUtc.DateTime);

    return jwtToken;
  }

  internal AuthUser? GetSessionUser(IIdentity? id)
  {
    var identity = id as ClaimsIdentity;
    if (identity == null) return null;

    var jtiClaim = identity.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti);
    if (jtiClaim == null) return null;

    if (!Guid.TryParse(jtiClaim.Value, out Guid authGuid))
      return null;

    lock (_lockObj)
    {
      var auth = _cache.Get<AuthUser>($"AuthPool:{identity.Name}");
      if (auth == null) return null;

      // 再確認一次授權ID有無相同
      if (auth.AuthGuid != authGuid)
        return null;

      // 確認未過期
      if (auth.ExpiresUtc <= DateTimeOffset.UtcNow)
      {
        // 若已過期則移除
        _cache.Remove($"AuthPool:{identity.Name}");
        return null;
      }

      // success
      return auth;
    }
  }

  internal void SignOut(IIdentity? id)
  {
    var identity = id as ClaimsIdentity;
    if (identity == null) return;

    var jtiClaim = identity.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti);
    if (jtiClaim == null) return;

    if (!Guid.TryParse(jtiClaim.Value, out Guid authGuid))
      return;

    // 移除登入註記
    lock (_lockObj)
    {
      _cache.Remove($"AuthPool:{identity.Name}");
    }
  }
}

//[TsInterface]
//public class LoginArgs
//{
//  [Required]
//  [Display(Name = "帳號")]
//  public string userId { get; set; } = string.Empty;
//
//  [Required]
//  [Display(Name = "通關密語")]
//  public string credential { get; set; } = string.Empty;
//
//  [Required]
//  [Display(Name = "驗證碼")]
//  public string vcode { get; set; } = string.Empty;
//}

//[TsInterface]
//public class LoginResult
//{
//  public string LoginUserId { get; set; } = string.Empty;
//  public string LoginUserName { get; set; } = string.Empty;
//  [TsProperty(Type = "Date")]
//  public DateTimeOffset ExpiredTime { get; set; }
//  public string AuthToken { get; set; } = string.Empty;
//}
