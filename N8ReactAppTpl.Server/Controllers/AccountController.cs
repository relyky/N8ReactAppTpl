using DTO.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using N8ReactAppTpl.Server.Models;
using N8ReactAppTpl.Server.Services;

namespace N8ReactAppTpl.Server.Controllers;

/// <summary>
/// ※ 未處理 Refresh token 問題 
/// </summary>
[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AccountController(ILogger<AccountController> _logger, IMemoryCache _cache,  AccountService _account) : ControllerBase
{
  /// <summary>
  /// for Anti-Forgery
  /// </summary>
  [HttpPost("[action]")]
  public ActionResult<string> GetApiKey()
  {
    Guid loginSid = Guid.NewGuid();
    string cypher = Utils.AesSimpleEncrypt(loginSid);
    _cache.Set($"ApiKey:{loginSid}", cypher, TimeSpan.FromMinutes(3)); // ３分鐘內需完成登入

    //// 可以送回 cookie - 正式部署後無效的樣子！
    //Response.Cookies.Append("my-sec-cookie", cypher, new CookieOptions()
    //{
    //  Expires = DateTimeOffset.Now.AddMinutes(3),
    //  SameSite = SameSiteMode.Strict,
    //  Secure = true,
    //  HttpOnly = true,
    //});

    return Ok(new { message = cypher });
  }

  [HttpPost("[action]")]
  public ActionResult<LoginResult> Login(LoginArgs login, [FromHeader(Name = "X-Api-Key")] string? cypher)
  {
    try
    {
      // 模擬長時間運算。正式版移除。
      SpinWait.SpinUntil(() => false, 2000);

      #region verify X-Api-Key
      if (String.IsNullOrWhiteSpace(cypher))
        return Unauthorized();

      Guid loginSid = Utils.AesSimpleDecrypt<Guid>(cypher);
      if (!_cache.TryGetValue<string>($"ApiKey:{loginSid}", out string? _cypher))
        return Unauthorized();

      if (cypher != _cypher)
        return Unauthorized();
      #endregion

      if (!_account.Authenticate(login))
        return Unauthorized();

      var auth = _account.Authorize(login.UserId);
      if (auth == null)
        return Unauthorized();

      var token = _account.GenerateJwtToken(auth);

      //# 已完成登入驗證，可移除 loginSid
      _cache.Remove($"ApiKey:{loginSid}");

      _logger.LogInformation($"使用者[{auth.UserId}]登入完成。");
      return Ok(new LoginResult
      {
        LoginUserId = auth.UserId,
        LoginUserName = auth.UserName,
        ExpiredTime = auth.ExpiresUtc.ToLocalTime(),
        AuthToken = token
      });
    }
    catch
    {
      return Unauthorized();
    }
  }

  /// <summary>
  /// 登出
  /// </summary>
  [Authorize]
  [HttpPost("[action]")]
  public ActionResult Logout()
  {
    // 模擬長時間運算。正式版移除。
    SpinWait.SpinUntil(() => false, 2000);

    // 登出
    var id = HttpContext.User.Identity;
    _account.SignOut(id);
    _logger.LogInformation($"使用者[{id!.Name}]登出完成。");
    return NoContent();
  }

  /// <summary>
  /// 取得現在連線會話中的使用者
  /// </summary>
  [Authorize]
  [HttpPost("[action]")]
  public ActionResult<LoginResult> GetAuthInfo()
  {
    // 模擬長時間運算。正式版移除。
    SpinWait.SpinUntil(() => false, 2000);

    // 取現在登入授權資料
    AuthUser? auth = _account.GetSessionUser(HttpContext.User.Identity);
    if (auth == null)
      return Unauthorized();

    var token = _account.GenerateJwtToken(auth);

    _logger.LogInformation($"取得登入者[{auth.UserId}]資訊。");
    return Ok(new LoginResult
    {
      LoginUserId = auth.UserId,
      LoginUserName = auth.UserName,
      ExpiredTime = auth.ExpiresUtc.ToLocalTime(),
      AuthToken = token
    });
  }
}

