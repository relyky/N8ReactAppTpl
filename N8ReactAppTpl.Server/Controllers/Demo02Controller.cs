using DTO.Demo02;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using N8ReactAppTpl.Server.Models;
using Swashbuckle.AspNetCore.Annotations;
using Vista.Biz;

namespace N8ReactAppTpl.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class Demo02Controller(ILogger<Demo02Controller> _logger, Demo02Biz _biz) : ControllerBase
{
  [HttpPost("[action]")]
  public async Task<ActionResult<List<Demo02_Profile>>> QryDataList(Demo02_QryArgs qryArgs)
  {
    var dataList = _biz.QryDataList(qryArgs);

    // 模擬運算時間，正式版請移除。
    await Task.Delay(800);

    _logger.LogInformation($"Call {this.GetType().Name}.{nameof(QryDataList)}");
    return Ok(dataList);
  }

  [HttpPost("[action]")]
  public async Task<ActionResult<Demo02_Profile>> AddFormData(Demo02_FormData formData)
  {
    var newFormData = _biz.AddFormData(formData);
    var newProfile = _biz.MapToProfile(newFormData);

    // 模擬運算時間，正式版請移除。
    await Task.Delay(800);

    _logger.LogInformation($"Call {this.GetType().Name}.{nameof(AddFormData)}");
    return Ok(newProfile);
  }

  [HttpPost("[action]")]
  public async Task<ActionResult<Demo02_FormData>> GetFormData(string formNo)
  {
    var formData = _biz.GetFormData(formNo);

    // 模擬運算時間，正式版請移除。
    await Task.Delay(800);

    _logger.LogInformation($"Call {this.GetType().Name}.{nameof(GetFormData)}");
    return Ok(formData);
  }

}
