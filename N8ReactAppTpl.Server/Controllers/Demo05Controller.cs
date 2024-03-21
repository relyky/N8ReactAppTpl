using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using DTO.Demo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using N8ReactAppTpl.Server.Models;
using Swashbuckle.AspNetCore.Annotations;
using Vista.Biz;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace N8ReactAppTpl.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class Demo05Controller(ILogger<Demo05Controller> _logger, DemoBiz _biz) : ControllerBase
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

  [SwaggerResponse(200, Type = typeof(IEnumerable<DemoBiz_UploadDetail>))]
  [SwaggerResponse(400, Type = typeof(string))]
  [HttpPost("[action]")]
  public IActionResult UploadFile(List<IFormFile> files)
  {
    try
    {
      var uploadFile = files[0];
      using var fs = uploadFile.OpenReadStream();
      var dataList = _biz.ParseUploadFile(fs);
      return Ok(dataList);
    }
    catch(Exception ex)
    {
      return BadRequest(ex.Message);
    }
  }


  [AllowAnonymous]
  [HttpPost("[action]/{num}")]
  public IActionResult FailHandlingLab(int num)
  {
    try
    {
      if (num == 400)
        return BadRequest(new { Message = "模擬錯誤訊息 JSON。" });

      if (num == 4002)
        return BadRequest("模擬錯誤訊息 TEXT。");

      if (num == 4003)
        return ValidationProblem("模擬錯誤訊息 TEXT。");

      if (num == 4004)
        return ValidationProblem("模擬錯誤訊息 TEXT。", "我是 instance", 400, "我是 title", "我是 type");

      if (num == 4005)
      {
        this.ModelState.AddModelError("某個欄位", "模擬某個欄位錯誤訊息!");
        return ValidationProblem(this.ModelState);
      }

      if (num == 422)
        return UnprocessableEntity("模擬錯誤訊息 TEXT。");

      if (num == 4222)
        return UnprocessableEntity(new { Message = "模擬錯誤訊息 JSON。" });

      if (num == 500)
        return Problem("模擬錯誤訊息 TEXT。");

      if (num == 600)
        throw new ApplicationException("模擬錯誤訊息 TEXT。");

      if (num == 200)
        return Ok(new { Message = $"你輸入了{num} JSON" });

      if (num == 204)
        return NoContent();

      return Ok($"你輸入了{num}");
    }
    catch (Exception ex)
    {
      throw ex;
//      return ValidationProblem(); // 400
//      return Problem(ex.Message, statusCode: 422); // 500
//      return UnprocessableEntity(ex);
//      return BadRequest(ex.Message);
    }
  }
}
