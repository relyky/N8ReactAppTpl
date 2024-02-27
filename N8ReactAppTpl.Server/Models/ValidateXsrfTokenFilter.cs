using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using System.Net;

namespace N8ReactAppTpl.Server.Models;

/// <summary>
/// for Anit-Forgery
/// </summary>
public class ValidateXsrfTokenFilter(ILogger<ValidateXsrfTokenFilter> _logger, IMemoryCache _cache) : Attribute, IAuthorizationFilter
{
  public void OnAuthorization(AuthorizationFilterContext context)
  {
    try
    {
      if (!context.HttpContext.Request.Cookies.TryGetValue("XSRF-TOKEN", out string? extractedToken))
      {
        _logger.LogError("XSRF-TOKEN is missing.");
        context.Result = new UnauthorizedResult();
        return;
      }

      Guid loginSid = Utils.AesSimpleDecrypt<Guid>(extractedToken);
      if (!_cache.TryGetValue<string>($"XSRF-TOKEN:{loginSid}", out string? _token))
      {
        _logger.LogError("XSRF-TOKEN is not exists.");
        context.Result = new UnauthorizedResult();
        return;
      }

      // 取出 token 後就可移除
      _cache.Remove($"XSRF-TOKEN:{loginSid}");

      if (_token != extractedToken)
      {
        _logger.LogError("XSRF-TOKEN is invalid.");
        context.Result = new UnauthorizedResult();
        return;
      }

      // 送回新的 XSRF-TOKEN
      ResponseAndStoreXsrfToken(context.HttpContext, _cache);
    }
    catch(Exception ex)
    {
      _logger.LogError(ex, "XSRF-TOKEN exception.");
      context.Result = new UnauthorizedResult();
    }
  }

  /// <summary>
  /// Procedure
  /// </summary>
  public static void ResponseAndStoreXsrfToken(HttpContext context, IMemoryCache cache)
  {
    Guid loginSid = Guid.NewGuid();
    string token = Utils.AesSimpleEncrypt(loginSid);
    cache.Set($"XSRF-TOKEN:{loginSid}", token, TimeSpan.FromMinutes(3)); // ３分鐘內需完成登入

    // 可以送回 cookie - 正式部署後無效的樣子！
    context.Response.Cookies.Append("XSRF-TOKEN", token, new CookieOptions()
    {
      Expires = DateTimeOffset.Now.AddMinutes(3),
      SameSite = SameSiteMode.Lax, // SameSiteMode.Strict,
      Secure = true,
      HttpOnly = true,
    });
  }
}
