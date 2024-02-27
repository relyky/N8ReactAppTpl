using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MultiLingualWASMLab.Server.Models;
using N8ReactAppTpl.Server.Models;
using N8ReactAppTpl.Server.Services;
using Reinforced.Typings.Attributes;
using System.Text;

//## Reinforced.Typings ����]�w����
[assembly: TsGlobal(
  CamelCaseForProperties = true,            // �p�d�m�R�W�k
  UseModules = true,                        // �ҥ� modules
  DiscardNamespacesWhenUsingModules = true, // �ݻP�Ѽ� UseModules �f�t�F������ "modules"�C
  ExportPureTypings = true                  // �ͦ��«ŧi�� .d.ts�C 
)]

var builder = WebApplication.CreateBuilder(args); //--------------------------------------------------
var _config = builder.Configuration;

builder.Logging.AddRinLogger(); // for Rin ��ť HTTP �ʥ]

//## for Authentication & Authorization
var tokenValidationParameters = JwtAuthenticationTool.GenerateTokenValidationParameters(_config);
builder.Services.AddAuthentication(option =>
{
  option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
{
#if DEBUG
  option.RequireHttpsMetadata = false;
#endif
  option.SaveToken = true;
  option.TokenValidationParameters = tokenValidationParameters;
});
builder.Services.AddAuthorization(option =>
{
  option.AddPolicy(IdentityAttr.AdminPolicyName, p =>
    p.RequireClaim(IdentityAttr.AdminClaimName, "true"));
});
builder.Services.AddSingleton(tokenValidationParameters);

//�� for Anit-Forgery
builder.Services.AddScoped<ValidateXsrfTokenFilter>();

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

//## for Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
