using DTO.Demo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
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
      "冰冷", "清爽", "冷", "涼爽", "溫和", "溫暖", "溫和", "炎熱", "悶熱", "灼熱"
  };

  [SwaggerResponse(200, Type = typeof(IEnumerable<WeatherForecast>))]
  [SwaggerResponse(400, Type = typeof(string))]
  [SwaggerResponse(422, Type = typeof(string))]
  [HttpPost("[action]")]
  public async Task<IActionResult> GetWeatherForecast(Demo05_QryArgs qryArgs)
  {
    // 模擬查詢時間
    await Task.Delay(800);

    //// 用422送回 FluentValidation 格式錯誤的物件訊息。
    //// 用400送回字串格式的錯誤訊息
    //if (qryArgs.Count < 10)
    //  return UnprocessableEntity(new
    //  {
    //    FieldName = "Count",
    //    ErrorDescription = "輸入參數格式錯誤！"
    //  });

    if (qryArgs.Count < 5)
      return BadRequest("輸入參數格式錯誤！ 必需 5 筆以上。");

    if (qryArgs.Count < 0)
    {
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

  [SwaggerResponse(200, Type = typeof(byte[]))]
  [SwaggerResponse(400, Type = typeof(string))]
  [HttpPost("[action]")]
  public IActionResult DownloadFile([FromQuery] string filename)
  {
    //return BadRequest("模擬下載檔案失敗！");

    FileInfo file = new FileInfo("Assets/附件一：民國112年政府行政機關辦公日曆表.xls");
    using var fs = file.OpenRead();
    using var ms = new MemoryStream();
    fs.CopyTo(ms);
    ms.GetBuffer();
    return File(ms.GetBuffer(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
  }
}
