using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace N8ReactAppTpl.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
  /// <summary>
  /// 未完成；未驗證；
  /// </summary>
  [HttpGet("[action]")]
  public async Task<IActionResult> GetAntiForgeryToken()
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
}
