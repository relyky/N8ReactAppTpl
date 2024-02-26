using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace N8ReactAppTpl.Server.Models;

public class ApiKeyAuthFilter(IConfiguration _config) : Attribute, IAuthorizationFilter
{
  public const string ApiKeySectionName = "Authentication:ApiKey";
  public const string ApiKeyHeaderName = "X-Api-Key";

  public void OnAuthorization(AuthorizationFilterContext context)
  {
    if (!context.HttpContext.Request.Headers.TryGetValue(ApiKeyHeaderName, out var extractedApiKey))
    {
      context.Result = new UnauthorizedObjectResult(new { message = "API Key mission" });
      return;
    }

    string apiKey = _config.GetValue<string>(ApiKeySectionName)!;
    if(!apiKey.Equals(extractedApiKey))
    {
      context.Result = new UnauthorizedObjectResult(new { message = "Invalid API Key" });
      return;
    }
  }
}
