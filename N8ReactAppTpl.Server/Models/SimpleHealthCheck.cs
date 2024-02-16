using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Text.Json;
using System.Text;

namespace N8ReactAppTpl.Server.Models;

internal class SimpleHealthCheck : IHealthCheck
{
  Task<HealthCheckResult> IHealthCheck.CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken)
  {
    try
    {
      return Task.FromResult(HealthCheckResult.Healthy("我很好。"));
    }
    catch (Exception ex)
    {
      return Task.FromResult(HealthCheckResult.Unhealthy(description: ex.Message, exception: ex));
    }
  }
}