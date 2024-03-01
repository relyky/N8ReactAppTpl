using DTO.Demo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using N8ReactAppTpl.Server.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace N8ReactAppTpl.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class Demo05Controller(ILogger<Demo05Controller> _logger) : ControllerBase
{
  private static readonly string[] Summaries = new[]
  {
      //"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
      "�B�N", "�M�n", "�N", "�D�n", "�ũM", "�ŷx", "�ũM", "����", "�e��", "�`��"
  };

  [SwaggerResponse(200, Type = typeof(IEnumerable<WeatherForecast>))]
  [SwaggerResponse(400, Type = typeof(string))]
  [SwaggerResponse(422, Type = typeof(string))]
  [HttpPost("[action]")]
  public async Task<IActionResult> GetWeatherForecast(Demo05_QryArgs qryArgs)
  {
    // �����d�߮ɶ�
    await Task.Delay(800);

    //// ��422�e�^ FluentValidation �榡���~������T���C
    //// ��400�e�^�r��榡�����~�T��
    //if (qryArgs.Count < 10)
    //  return UnprocessableEntity(new
    //  {
    //    FieldName = "Count",
    //    ErrorDescription = "��J�ѼƮ榡���~�I"
    //  });

    if (qryArgs.Count < 5)
      return BadRequest("��J�ѼƮ榡���~�I ���� 5 ���H�W�C");

    if (qryArgs.Count < 0) {
      qryArgs.Count = 0;
    }

    var result = Enumerable.Range(1, qryArgs.Count).Select(index => new WeatherForecast
    {
      Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
      TemperatureC = Random.Shared.Next(-20, 55),
      Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    })
    .ToArray();

    _logger.LogInformation($"Call {nameof(GetWeatherForecast)}");
    return Ok(result);
  }
}
