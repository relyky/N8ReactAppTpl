using Reinforced.Typings.Attributes;

namespace N8ReactAppTpl.Server.DTO;

[TsInterface]
public record WeatherForecast
{
  [TsProperty(Type = "string")]
  public DateOnly Date { get; set; }

  public int TemperatureC { get; set; }

  public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

  public string? Summary { get; set; }
}

[TsInterface]
public record MyTestDto
{
  [TsProperty(Type = "string")]
  public DateTime TestDateTime { get; set; }
  public string TestString { get; set; } = default!;
  public decimal TestDecimal { get; set; }
  public bool TestBool { get; set; }
}
