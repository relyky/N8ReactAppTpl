import { RouteObject } from "react-router-dom"
import ErrorPage from './error-page'
import MainLayout from './MainLayout'
import Home from './pages/Home/AppHome'
import Login from './pages/Account/Login'
import Counter from './pages/Counter/AppForm'
import Demo01 from "./pages/Demo01/AppForm"
import Demo02 from "./pages/Demo02/AppForm"
import Demo03 from "./pages/Demo03/AppForm"
import Demo05 from './pages/Demo05/AppForm'
import Lab01 from './pages/Lab01/AppForm'
import Labbing from "./pages/Labbing/AppForm"

/// To register the routing pages 
/// 預計有百多個功能選單預註冊。
export const appRoutes: RouteObject[] = [
  {
    path: "labbing",
    element: <Labbing />,
  },
  {
    path: "login",
    element: <Login />,
  },
  /* { //# 首頁放此處就不用登入。
    path: "/",
    element: <Home />,
  }, */
  { //# 此處外掛上 MainLayout，一定要登入才能開啟作業。
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "counter", element: <Counter /> },
      { path: "demo01", element: <Demo01 /> },
      { path: "demo02", element: <Demo02 /> },
      { path: "demo03", element: <Demo03 /> },
      { path: "demo05", element: <Demo05 /> },
      { path: "lab01", element: <Lab01 /> },
    ]
  },
];
