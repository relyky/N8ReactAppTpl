using DTO.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using N8ReactAppTpl.Server.Models;
using N8ReactAppTpl.Server.Services;

namespace N8ReactAppTpl.Server.Controllers;

/// <summary>
/// ※ 未處理 Refresh token 問題 
/// </summary>
[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AccountController(ILogger<AccountController> _logger, AccountService _account) : ControllerBase
{
  /// <summary>
  /// 未完成；未驗證；
  /// </summary>
  [HttpGet("[action]")]
  public async Task<ActionResult<string>> GetAntiForgeryToken()
  {
    await Task.CompletedTask;

    // 可以送回 cookie
    Response.Cookies.Append("my-cookie", $"this is a cookie at {DateTime.Now.ToString("mm:ss")}", new CookieOptions()
    {
      Expires = DateTimeOffset.Now.AddMinutes(1),
      SameSite = SameSiteMode.Strict,
      Secure = true,
      HttpOnly = true,
    });

    return Ok();
  }

  [HttpPost("[action]")]
  public ActionResult<LoginResult> Login(LoginArgs login)
  {
    // 模擬長時間運算
    SpinWait.SpinUntil(() => false, 2000);

    if (!_account.Authenticate(login))
      return Unauthorized();

    var auth = _account.Authorize(login.userId);
    if (auth == null)
      return Unauthorized();

    var token = _account.GenerateJwtToken(auth);

    _logger.LogInformation($"使用者[{auth.UserId}]登入完成。");
    return Ok(new LoginResult
    {
      LoginUserId = auth.UserId,
      LoginUserName = auth.UserName,
      ExpiredTime = auth.ExpiresUtc.ToLocalTime(),
      AuthToken = token
    });
  }

  /// <summary>
  /// 登出
  /// </summary>
  [Authorize]
  [HttpPost("[action]")]
  public ActionResult Logout()
  {
    // 模擬長時間運算
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
    // 模擬長時間運算
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

