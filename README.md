# N8ReactAppTpl
 NET8 + React.v18   
 起始專案：`React and ASP.NET Core`
 
## 後台規格
* ASP.NET Core 8.0 Web API
* C# v12
* 加掛 [Swashbuckle/Swagger](https://learn.microsoft.com/zh-tw/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio)、
  [Rin](https://github.com/mayuki/Rin)、
  [healthz](https://learn.microsoft.com/zh-tw/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-8.0)
* 認證方法：Cookie 為預設，JwtBearer 為選項。 
* 啟用 GDPR 政策檢查(GDPR Consent)
* 登入程序中加入客製 XSRF Token 驗證。

## 前台規格


### vite 相關
