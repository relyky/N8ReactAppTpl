using Microsoft.AspNetCore.Mvc;

namespace N8ReactAppTpl.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController(ILogger<WeatherForecastController> _logger) : ControllerBase
{
  private static readonly string[] Summaries = new[]
  {
      "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
  };

  [HttpGet(Name = "GetWeatherForecast")]
  public async Task<IEnumerable<WeatherForecast>> Get()
  {
    await Task.Delay(800);

    var result = Enumerable.Range(1, 5).Select(index => new WeatherForecast
    {
      Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
      TemperatureC = Random.Shared.Next(-20, 55),
      Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    })
    .ToArray();

    _logger.LogInformation($"Get {nameof(WeatherForecastController)}");
    return result;
  }
}
