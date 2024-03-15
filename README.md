# N8ReactAppTpl
 NET8 + React.v18  
 Web API + Swagger + Rin + healthz + Cookie Authentication +   
 React + vite + 
[Redux Toolkit](https://redux-toolkit.js.org/) + 
[React Router](https://reactrouter.com/en/main/start/tutorial) + 
[Material UI](https://mui.com/core/) +
[SweetAlert2](https://sweetalert2.github.io/) +
[date-fns](https://date-fns.org/) +
[React Hook Form](https://react-hook-form.com/)

 起始專案：`React and ASP.NET Core`   
 IDE: Visual Studio 2022   
 Lang: C# 12, TypeScript   
 
# 後台規格
* ASP.NET Core 8.0 Web API
* 加掛 [Swashbuckle/Swagger](https://learn.microsoft.com/zh-tw/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio)、
  [Rin](https://github.com/mayuki/Rin)、
  [healthz](https://learn.microsoft.com/zh-tw/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-8.0)
* 認證方法：Cookie 為預設，JwtBearer 為選項。 
* 啟用 GDPR 政策檢查(GDPR Consent)
* 登入程序中加入客製 XSRF Token 驗證。

# 前台規格


### vite 相關
