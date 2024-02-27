﻿using DTO.Account;
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
  public ActionResult<string> GetXsrfToken()
  {
    ValidateXsrfTokenFilter.ResponseAndStoreXsrfToken(this.HttpContext, _cache);
    return NoContent();
  }

  [ServiceFilter<ValidateXsrfTokenFilter>]
  [HttpPost("[action]")]
  public ActionResult<LoginResult> Login(LoginArgs login)
  {
    try
    {
      // 模擬長時間運算。正式版移除。
      SpinWait.SpinUntil(() => false, 2000);

      if (!_account.Authenticate(login))
        return Unauthorized();

      var auth = _account.Authorize(login.UserId);
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
  /// 刷新 AccessToken --- 未驗證
  /// </summary>
  [Authorize]
  [HttpPost("[action]")]
  public ActionResult<LoginResult> RefreshAccessToken()
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

  /// <summary>
  /// 取得現在線上的使用者(預計正式版不公開)
  /// </summary>
  [Authorize]
  [HttpPost("[action]")]
  public ActionResult<AuthUser> GetCurrentUser()
  {
    // 模擬長時間運算。正式版移除。
    SpinWait.SpinUntil(() => false, 2000);

    // 取現在登入授權資料
    AuthUser? auth = _account.GetSessionUser(HttpContext.User.Identity);
    if (auth == null)
      return Unauthorized();

    _logger.LogInformation($"取得登入者[{auth.UserId}]資訊。");
    return Ok(auth);
  }

}

