using Reinforced.Typings.Attributes;
using System.ComponentModel.DataAnnotations;

///※ Reinforced.Typings 已設定成依 namespace 產生標的目錄。
/// 如：DTO.Domo => client\src\DTO\Demo。
/// 如：DTO.Account => client\src\DTO\Account。
namespace DTO.Account;

[TsInterface]
public record LoginArgs
{
  [Required]
  [Display(Name = "帳號")]
  public string UserId { get; set; } = string.Empty;

  [Required]
  [Display(Name = "通關密語")]
  public string Credential { get; set; } = string.Empty;

  [Required]
  [Display(Name = "驗證碼")]
  public string Vcode { get; set; } = string.Empty;
}

[TsInterface]
public record LoginUserInfo
{
  public string LoginUserId { get; set; } = string.Empty;
  public string LoginUserName { get; set; } = string.Empty;
  [TsProperty(Type = "Date")]
  public DateTimeOffset ExpiredTime { get; set; }
}

[TsInterface]
public record AccessTokenResult
{
  [TsProperty(Type = "Date")]
  public DateTimeOffset ExpiredTime { get; set; }
  public string AuthToken { get; set; } = string.Empty;
}

