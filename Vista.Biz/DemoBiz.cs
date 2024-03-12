using ClosedXML.Excel;
using DTO.Demo;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vista.Biz;

public class DemoBiz
{
  /// <summary>
  /// 記得要釋放 MemoryStream
  /// </summary>
  public List<DemoBiz_UploadDetail> ParseUploadFile(Stream file)
  {
    using var workbook = new XLWorkbook(file);
    var sheet1 = workbook.Worksheet(1);
    int rowCount = sheet1.RowsUsed().Count();

    var dataList = new List<DemoBiz_UploadDetail>();
    foreach (var row in sheet1.Rows(2, rowCount))
    {
      var item = new DemoBiz_UploadDetail();
      item.UnitName = row.Cell(1).GetValue<string>();
      item.Amount1 = row.Cell(2).GetValue<decimal>();
      item.Amount2 = row.Cell(3).GetValue<decimal>();
      item.Amount3 = row.Cell(4).GetValue<decimal>();
      item.Amount4 = row.Cell(5).GetValue<decimal>();
      item.Amount5 = row.Cell(6).GetValue<decimal>();
      dataList.Add(item);
    }

    return dataList;
  }
}
