# N8ReactAppTpl
 NET8 + React.v18 with TypeScript    
 Web API + 
[Swashbuckle/Swagger](https://learn.microsoft.com/zh-tw/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio) + 
[Rin](https://github.com/mayuki/Rin) + 
[healthz](https://learn.microsoft.com/zh-tw/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-8.0) + 
[Cookie Authentication](https://learn.microsoft.com/zh-tw/aspnet/core/security/authentication/cookie?view=aspnetcore-8.0) +   
 [React](https://react.dev/reference/react) + 
[vite](https://vitejs.dev/guide/) + 
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
* 加掛 [Swashbuckle/Swagger](https://learn.microsoft.com/zh-tw/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio): 生成 Swagger UI。開發期間有效。
* 加掛 [Rin](https://github.com/mayuki/Rin): Request/response Inspector。檢驗封包內容與預期是否相同。開發期間有效。
* 加掛 [healthz](https://learn.microsoft.com/zh-tw/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-8.0): 自主健康檢查。
* 認證方法：Cookie 為預設，JwtBearer 為選項。 
* 啟用 GDPR 政策檢查(GDPR Consent)
* 登入程序中加入客製 XSRF Token 驗證。

# 前台規格
 各主要模組職責:
* [React](https://react.dev/reference/react): 前端核心。
* [vite](https://vitejs.dev/guide/): 建構工具(build tool)與開發伺服器(dev server)。
* [Redux Toolkit](https://redux-toolkit.js.org/): 前端 data store。
* [React Router](https://reactrouter.com/en/main/start/tutorial): page routing。
* [Material UI](https://mui.com/core/): CSS framework。
* [SweetAlert2](https://sweetalert2.github.io/): message box，雖然 @MUI 也有不過就是不好用。
* [date-fns](https://date-fns.org/): 日期運算(無言啊)。
* [React Hook Form](https://react-hook-form.com/): 表單輸入檢驗(form input validation)，有 required、min、max、regex 等等。 

# vite 組態
主要組態檔``。大體上用起始專案 `React and ASP.NET Core` 給的組態就行了。   
此設定啟用了 proxy 另建開發伺服器(dev server) port:5173。  
其中 api 預設只打開 `^/weatherforecast` 將它改成 `'^/api/(\\w+)'` (RegEx 語法)這樣其他 web api 才會通。

```TypeScript
//§ vite.config.ts
// [...略...]
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      //'^/weatherforecast': {
      '^/api/(\\w+)': {
        target: 'https://localhost:7144/',
        secure: false
      }
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    }
  }
})
```

# 工作項目
- [x] Uranus
- [x] Neptune
- [ ] Comet Haley


