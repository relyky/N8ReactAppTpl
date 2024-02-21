using N8ReactAppTpl.Server.Models;
using N8ReactAppTpl.Server.Services;
using Reinforced.Typings.Attributes;

[assembly: TsGlobal(CamelCaseForProperties = true, UseModules = true, DiscardNamespacesWhenUsingModules = true)]
///## Reinforced.Typings ����]�w����
/// CamelCaseForProperties = true, �p�d�m�R�W�k
/// UseModules = true, �ҥ� modules
/// DiscardNamespacesWhenUsingModules = true, �ݻP�Ѽ� UseModules �f�t�F������ "modules"�C

var builder = WebApplication.CreateBuilder(args); //--------------------------------------------------

builder.Logging.AddRinLogger(); // for Rin ��ť HTTP �ʥ]

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddRin(); // for Rin ��ť HTTP �ʥ]

//## for ���d���A�ˬd
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
  app.UseRin(); // for Rin ��ť HTTP �ʥ]
  app.UseSwagger();
  app.UseSwaggerUI();
  app.UseRinDiagnosticsHandler(); // for Rin ��ť HTTP �ʥ]
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
