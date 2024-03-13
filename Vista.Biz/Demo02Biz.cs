using DTO.Demo02;

namespace Vista.Biz;

public class Demo02Biz
{
  //# sims data base
  static List<Demo02_FormData> _simsRepo = new(new[] {
    new Demo02_FormData { FormNo = "F001", FormTitle = "表單００１號", UpdDtm = DateTime.Now.AddDays(-7), FieldA = "AAA", FieldB = "BBB", FieldC = "CCC" },
    new Demo02_FormData { FormNo = "F002", FormTitle = "表單００２號", UpdDtm = DateTime.Now.AddDays(-6), FieldA = "AAA", FieldB = "BBB", FieldC = "CCC" },
    new Demo02_FormData { FormNo = "F003", FormTitle = "表單００３號", UpdDtm = DateTime.Now.AddDays(-5), FieldA = "AAA", FieldB = "BBB", FieldC = "CCC" },
    new Demo02_FormData { FormNo = "F004", FormTitle = "表單００４號", UpdDtm = DateTime.Now.AddDays(-4), FieldA = "AAA", FieldB = "BBB", FieldC = "CCC" },
    new Demo02_FormData { FormNo = "F005", FormTitle = "表單００５號", UpdDtm = DateTime.Now.AddDays(-3), FieldA = "AAA", FieldB = "BBB", FieldC = "CCC" },
    new Demo02_FormData { FormNo = "F006", FormTitle = "表單００６號", UpdDtm = DateTime.Now.AddDays(-2), FieldA = "AAA", FieldB = "BBB", FieldC = "CCC" },
    new Demo02_FormData { FormNo = "F007", FormTitle = "表單００７號", UpdDtm = DateTime.Now.AddDays(-1), FieldA = "AAA", FieldB = "BBB", FieldC = "CCC" },
  });

  internal List<Demo02_Profile> QryDataList(Demo02_QryArgs args)
  {
    var qry = _simsRepo.AsQueryable();

    if (!string.IsNullOrEmpty(args.FormNo))
      qry = qry.Where(c => c.FormNo == args.FormNo);

    if (!String.IsNullOrWhiteSpace(args.FormTitle))
      qry = qry.Where(c => c.FormTitle.IndexOf(args.FormTitle) > -1);

    var dataList = qry.Select(this.MapToProfile).ToList();

    return dataList;
  }

  internal Demo02_FormData? GetFormData(string formNo)
  {
    var formData = _simsRepo.FirstOrDefault(c => c.FormNo == formNo);
    return formData;
  }

  internal Demo02_FormData AddFormData(Demo02_FormData formData)
  {
    var formNo = $"F{_simsRepo.Select(c => int.Parse(c.FormNo.Substring(1))).Max() + 1:000}";

    var info = new Demo02_FormData()
    {
      FormNo = formNo, // id
      FormTitle = formData.FormTitle,
      FieldA = formData.FieldA,
      FieldB = formData.FieldB,
      FieldC = formData.FieldC,
      UpdDtm = DateTime.Now // 自動填入
    };

    _simsRepo.Add(info);
    return info;
  }

  internal Demo02_FormData UpdFormData(Demo02_FormData formData)
  {
    var info = _simsRepo.Single(c => c.FormNo == formData.FormNo);

    info = info with
    {
      FormTitle = formData.FormTitle,
      FieldA = formData.FieldA,
      FieldB = formData.FieldB,
      FieldC = formData.FieldC,
      UpdDtm = DateTime.Now // 自動填入
    };

    return info;
  }

  internal bool DelFormData(string formNo)
  {
    var info = _simsRepo.FirstOrDefault(c => c.FormNo == formNo);
    if (info == null) return false;

    _simsRepo.Remove(info);
    return true;
  }

  /// <summary>
  /// helper action
  /// </summary>
  internal Demo02_Profile MapToProfile(Demo02_FormData formData)
  {
    return new Demo02_Profile
    {
      FormNo = formData.FormNo,
      FormTitle = formData.FormTitle,
      UpdDtm = formData.UpdDtm?.ToString("yyyy/MM/dd HH:mm"),
    };
  }
}
