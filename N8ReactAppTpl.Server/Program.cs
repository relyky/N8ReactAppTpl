using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
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
// for JwtBearer Auth
var jwtTokenValidationParameters = JwtAuthenticationTool.GenerateTokenValidationParameters(_config);

// for COOKIE Auth
// ref �� https://blazorhelpwebsite.com/ViewBlogPost/36
builder.Services.Configure<CookiePolicyOptions>(options =>
{
  options.MinimumSameSitePolicy = SameSiteMode.Lax; // SameSiteMode.Strict;

  //���� for GDPR Consent
  // AspNetCore2.1 supports the GDPR specification introduced on May 25, 2018,
  // which considers cookies to be private data of users.If they are to be used,
  // they must obtain user consent.
  options.CheckConsentNeeded = context => true; // �ҥ� GDPR �F���ˬd
  options.ConsentCookie.Name = ".AspNet.Consent"; // ".AspNet.Consent"
  options.ConsentCookie.HttpOnly = false;
  options.ConsentCookie.Expiration = TimeSpan.FromDays(365);
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
  .AddCookie(cfg =>
  {
    cfg.LoginPath = "/login"; // default: /Accout/Login
    cfg.Cookie.Name = ".N8ReactAppTpl.Server.Cookies"; //default:.AspNetCore.Cookies
  })
  .AddJwtBearer(option =>
  {
#if DEBUG
    option.RequireHttpsMetadata = false;
#endif
    option.SaveToken = true;
    option.TokenValidationParameters = jwtTokenValidationParameters;
  });

builder.Services.AddSingleton(jwtTokenValidationParameters);

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
app.UseCookiePolicy(); // for COOKIE Auth
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
