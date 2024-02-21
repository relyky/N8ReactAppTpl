using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using N8ReactAppTpl.Server.Models;
using N8ReactAppTpl.Server.Services;
using Reinforced.Typings.Attributes;
using System.Text;

[assembly: TsGlobal(CamelCaseForProperties = true, UseModules = true, DiscardNamespacesWhenUsingModules = true)]
///## Reinforced.Typings ����]�w����
/// CamelCaseForProperties = true, �p�d�m�R�W�k
/// UseModules = true, �ҥ� modules
/// DiscardNamespacesWhenUsingModules = true, �ݻP�Ѽ� UseModules �f�t�F������ "modules"�C

var builder = WebApplication.CreateBuilder(args); //--------------------------------------------------
var _config = builder.Configuration;

builder.Logging.AddRinLogger(); // for Rin ��ť HTTP �ʥ]

/// �ϥ� Token-based �����{�һP���v (JWT),ref��[https://blog.miniasp.com/post/2022/02/13/How-to-use-JWT-token-based-auth-in-aspnet-core-60]
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      // �����ҥ��ѮɡA�^�����Y�|�]�t WWW-Authenticate ���Y�A�o�̷|��ܥ��Ѫ��Բӿ��~��]
      options.IncludeErrorDetails = true; // �w�]�Ȭ� true�A���ɷ|�S�O����

      options.TokenValidationParameters = new TokenValidationParameters
      {
        // �z�L�o���ŧi�A�N�i�H�q "sub" ���Ȩó]�w�� User.Identity.Name
        NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
        // �z�L�o���ŧi�A�N�i�H�q "roles" ���ȡA�åi�� [Authorize] �P�_����
        RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",

        // �@��ڭ̳��|���� Issuer
        ValidateIssuer = true,
        ValidIssuer = _config["JwtSettings:Issuer"],

        // �q�`���ӻݭn���� Audience
        ValidateAudience = false,
        //ValidAudience = "JwtAuthDemo", // �����ҴN���ݭn��g

        // �@��ڭ̳��|���� Token �����Ĵ���
        ValidateLifetime = true,

        // �p�G Token ���]�t key �~�ݭn���ҡA�@�볣�u��ñ���Ӥw
        ValidateIssuerSigningKey = false,

        // "1234567890123456" ���ӱq IConfiguration ���o
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JwtSettings:SignKey"]!))
      };
    });

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
