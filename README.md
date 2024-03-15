# N8ReactAppTpl
 NET8 + React.v18 with TypeScript    
 Web API + Swagger + Rin + healthz + Cookie Authentication + Reinforced.Typings   
 React + vite + Redux + React Router + Material UI + SweetAlert2 + date-fns + React Hook Form   

 起始專案：`React and ASP.NET Core`   
 IDE: Visual Studio 2022   
 Lang: C# 12, TypeScript   
 
# 後台規格
* ASP.NET Core 8.0 Web API
* 加掛 [Swashbuckle/Swagger](https://learn.microsoft.com/zh-tw/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio): 生成 Swagger UI。開發期間有效。
* 加掛 [Rin](https://github.com/mayuki/Rin): Request/response Inspector。檢驗封包內容與預期是否相同。開發期間有效。
* 加掛 [healthz](https://learn.microsoft.com/zh-tw/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-8.0): 自主健康檢查。
* 加掛 [Reinforced.Typings/DTO Transformer](https://github.com/reinforced/Reinforced.Typings): C# DTO to TypeScript。
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
* [Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch): 不管用那套通訊指令都要再包裝二、三層來做成高階通訊指令，綜合評估後原生的 fetch 指令分數最高。

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
- [x]  React and ASP.NET Core + TypeScript
- [x]  Web API: Swagger + Rin + Healthz
- [x]  Web API 全部以 “/api/FooBar” 命名
- [x]  SPA & CSR: BrowserRouter(react-router-dom)
- [x]  是否預設就有 CSS isolation。YES。
- [x]  CSS Framework: Material UI
- [ ]  ~CSS Framework: Tailwind CSS。--- abort 最終還是會選用 Material UI。~
- [x]  Custom Thema
- [x]  MainLayout
- [x]  NavMenu
- [x]  Overlay & TopAlert
- [x]  dark / light theme switch
- [x]  C# DTO to TypeScript : with Reinforced.Typings
- [x]  Banner with AuthStatus
- [x]  setup Redux --- 未找到更好的。
- [x]  AuthToken with JwtBearer
- [x]  AuthToken 改存入 cookie with sccure + http only + lax
- [x]  前端環境變數 [vite.env](https://vitejs.dev/guide/env-and-mode)
- [x]  首頁為特例不用登入
- [x]  useFormHand - CRUD handler
- [x]  用400送回字串格式的錯誤訊息
- [ ]  ~用422送回 JSON|FluentValidation 格式錯誤的物件訊息。--- abort 預期效益 < 副作用。~
- [x]  setup SweetAlert2
- [x]  Demo\Counter: CSS isolation, 基本操作 etc 
- [x]  Login Auth 程過，考慮 AnitForgery 機制
- [ ]  ~Login UI with X-Api-Key --- abort~
- [ ]  ~試用 react-auth-kit https://authkit.arkadip.dev/ —- abort 無預期效益~
- [x]  Logout
- [ ]  Refresh Token & GetPrincipalFromToken
- [ ]  測試 RequiresClaim
- [ ]  用 **Fluent Validation** 在後端做基本驗證 WebAPI 封包
- [x]  通訊方式改以 fetch 實作 postData 並整合 redux
- [ ]  ~通訊方式考慮 use-http\`useFetch` --- abort 綜合分數不如 fetch。~
- [ ]  ~通訊方式考慮 axios-hooks\`useAxios` --- abort 綜合分數不如 fetch。~
- [x]  實作 usePostData
- [ ]  實作 useLoadData
- [x]  把 asyncThunk 改以 useHook 實作 => useFormHand
- [x]  widgets\highorder 元件
- [x]  Demo1: auth status
- [x]  Demo2: Form CRUD, Form Submit
- [x]  Demo3: fileDownload, Excel 下載
- [ ]  Demo3: fileDownload 之 PDF 送印
- [x]  Demo4: fileUpload, Excel
- [x]  Demo5: FetchData 查詢報表。
- [x]  AssemblyInfo.cs 
- [ ]  widgets\highorder 元件之 ADateField 改以 string YYYY/MM/DD 溝通
- [ ]  NavMenu 選單項目由授權項目決定
- [ ]  試著部署到 Docker。


# 沒圖沒真象
react hook form 測試畫面
