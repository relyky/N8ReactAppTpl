using N8ReactAppTpl.Server.Models;
using N8ReactAppTpl.Server.Services;
using Reinforced.Typings.Attributes;

[assembly: TsGlobal(CamelCaseForProperties = true, UseModules = true, DiscardNamespacesWhenUsingModules = true)]
///## Reinforced.Typings 全域設定說明
/// CamelCaseForProperties = true, 小駱駝命名法
/// UseModules = true, 啟用 modules
/// DiscardNamespacesWhenUsingModules = true, 需與參數 UseModules 搭配；不產生 "modules"。

var builder = WebApplication.CreateBuilder(args); //--------------------------------------------------

builder.Logging.AddRinLogger(); // for Rin 監聽 HTTP 封包

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddRin(); // for Rin 監聽 HTTP 封包

//## for 健康狀態檢查
builder.Services.AddHealthChecks()
       .AddCheck<SimpleHealthCheck>(nameof(SimpleHealthCheck));

builder.Services.AddMemoryCache();
builder.Services.AddSingleton<AccountService>();

var app = builder.Build(); //--------------------------------------------------

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseRin(); // for Rin 監聽 HTTP 封包
  app.UseSwagger();
  app.UseSwaggerUI();
  app.UseRinDiagnosticsHandler(); // for Rin 監聽 HTTP 封包
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
