using Reinforced.Typings.Attributes;

///�� Reinforced.Typings �w�]�w���� namespace ���ͼЪ��ؿ��C
/// �p�GDTO.Domo => client\src\DTO\Demo�C
/// �p�GDTO.Account => client\src\DTO\Account�C
namespace DTO.Demo;

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
public record Demo05_QryArgs
{
  public int Count { get; set; }
  public string City { get; set; } = string.Empty;
}

[TsInterface]
public record DemoBiz_UploadDetail
{
  public string UnitName { get; set; } = string.Empty;
  public decimal Amount1 { get; set; }
  public decimal Amount2 { get; set; }
  public decimal Amount3 { get; set; }
  public decimal Amount4 { get; set; }
  public decimal Amount5 { get; set; }
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
