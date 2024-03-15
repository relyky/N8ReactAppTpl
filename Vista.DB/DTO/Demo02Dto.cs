using Reinforced.Typings.Attributes;

///※ Reinforced.Typings 已設定成依 namespace 產生標的目錄。
/// 如：DTO.Domo => client\src\DTO\Demo。
/// 如：DTO.Account => client\src\DTO\Account。
namespace DTO.Demo02;

[TsInterface]
public record Demo02_FormData
{
  public string FormNo { get; set; } = string.Empty;
  public string FormTitle { get; set; } = string.Empty;

  /// <summary>
  /// 預計日期:yyyy/MM/dd
  /// </summary>
  public string ExpectDate { get; set; } = string.Empty;

  [TsProperty(Type = "string", ForceNullable = true)]
  public DateTime? UpdDtm { get; set; }

  public string FieldA { get; set; } = string.Empty;

  public string FieldB { get; set; } = string.Empty;

  public string FieldC { get; set; } = string.Empty;
}

[TsInterface]
public record Demo02_Profile
{
  public string FormNo { get; set; } = string.Empty;
  public string FormTitle { get; set; } = string.Empty;
  public string? UpdDtm { get; set; } = string.Empty;
}

