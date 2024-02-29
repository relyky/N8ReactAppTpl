using DTO.Account;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using N8ReactAppTpl.Server.Models;
using N8ReactAppTpl.Server.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace N8ReactAppTpl.Server.Controllers;

/// <summary>
/// ※ 未處理 Refresh token 問題 
/// </summary>
[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AccountController(ILogger<AccountController> _logger, IMemoryCache _cache, AccountService _account) : ControllerBase
{
  /// <summary>
  /// for Anti-Forgery
  /// </summary>
  [HttpPost("[action]")]
  public ActionResult<string> GetXsrfToken()
  {
    ValidateXsrfTokenFilter.ResponseAndStoreXsrfToken(this.HttpContext, _cache);
    return NoContent();
  }

  [ServiceFilter<ValidateXsrfTokenFilter>]
  [HttpPost("[action]")]
  public async Task<ActionResult> Login(LoginArgs login)
  {
    try
    {
      // 模擬長時間運算。正式版移除。
      SpinWait.SpinUntil(() => false, 2000);

      //# Clear the existing external cookie to ensure a clean login process
      await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

      if (!_account.Authenticate(login))
        return Unauthorized();

      var auth = _account.Authorize(login.UserId);
      if (auth == null)
        return Unauthorized();

      //# PackUserClaimsData
      ClaimsIdentity userIdentity = new(CookieAuthenticationDefaults.AuthenticationScheme);
      userIdentity.AddClaim(new Claim(ClaimTypes.Name, auth.UserId));
      userIdentity.AddClaim(new Claim(ClaimTypes.GivenName, auth.UserName));
      userIdentity.AddClaim(new Claim(ClaimTypes.Sid, auth.AuthGuid.ToString()));
      userIdentity.AddClaims(auth.Roles.Select(role => new Claim(ClaimTypes.Role, role)));

      //# 執行 Cookie-Base Auth 註冊
      await HttpContext.SignInAsync(
          CookieAuthenticationDefaults.AuthenticationScheme,
          new ClaimsPrincipal(userIdentity),
          new AuthenticationProperties
          {
            IsPersistent = true, // auth.RememberMe,
            IssuedUtc = auth.IssuedUtc,
            ExpiresUtc = auth.ExpiresUtc,
            RedirectUri = this.Request.Host.Value,
            AllowRefresh = false, // Refreshing the authentication session should be allowed.
          });

      return Ok(new { message = "Login success." });
    }
    catch
    {
      return Unauthorized();
    }
  }

  /// <summary>
  /// 取得現在線上登入的使用者資訊
  /// </summary>
  [Authorize]
  [HttpPost("[action]")]
  public ActionResult<LoginUserInfo> GetLoginUser()
  {
    // 模擬長時間運算。正式版移除。
    SpinWait.SpinUntil(() => false, 2000);

    // 取現在登入授權資料
    AuthUser? auth = _account.GetSessionUser(HttpContext.User.Identity);
    if (auth == null)
      return Unauthorized();

    var result = new LoginUserInfo
    {
      LoginUserId = auth.UserId,
      LoginUserName = auth.UserName,
      ExpiredTime = auth.ExpiresUtc,
    };

    _logger.LogInformation($"取得登入者[{auth.UserId}]資訊。");
    return Ok(result);
  }

  /// <summary>
  /// 登出
  /// </summary>
  [Authorize]
  [HttpPost("[action]")]
  public async Task<ActionResult> Logout()
  {
    // 登出
    _account.SignOut(HttpContext.User.Identity);

    // Clear the existing external cookie to ensure a clean login process
    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

    return Ok(new { message = "Logout done." });
  }

  //=================================================================

  /// <summary>
  /// 要求 AccessToken，依現在 Cookie AUTH_TOKEN 來產生。 --- 未驗證
  /// </summary>
  [Authorize]
  [HttpPost("[action]")]
  public ActionResult RequestAccessToken()
  {
    try
    {
      // 模擬長時間運算。正式版移除。
      SpinWait.SpinUntil(() => false, 2000);

      // 取現在登入授權資料
      AuthUser? auth = _account.GetSessionUser(HttpContext.User.Identity);
      if (auth == null)
        return Unauthorized();

      var token = _account.GenerateJwtToken(auth);

      _logger.LogInformation($"RequestAccessToken[{auth.UserId}].");
      return Ok(new AccessTokenResult
      {
        ExpiredTime = token.expiresUtc.ToLocalTime(),
        AuthToken = token.JwtToken
      });
    }
    catch
    {
      return Unauthorized();
    }
  }

  /// <summary>
  /// 刷新 AccessToken，依現在 Bearer JWT_TOKEN 延期。 --- 未驗證
  /// </summary>
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  [HttpPost("[action]")]
  public ActionResult<AccessTokenResult> RefreshAccessToken()
  {
    try
    {
      // 模擬長時間運算。正式版移除。
      SpinWait.SpinUntil(() => false, 2000);

      // 取現在登入授權資料
      AuthUser? auth = _account.GetSessionUser(HttpContext.User.Identity);
      if (auth == null)
        return Unauthorized();

      var token = _account.GenerateJwtToken(auth);

      _logger.LogInformation($"RefreshAccessToken[{auth.UserId}].");
      return Ok(new AccessTokenResult
      {
        ExpiredTime = token.expiresUtc.ToLocalTime(),
        AuthToken = token.JwtToken
      });
    }
    catch
    {
      return Unauthorized();
    }
  }

}

