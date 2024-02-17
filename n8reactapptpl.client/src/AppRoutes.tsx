import { RouteObject } from "react-router-dom"
import ErrorPage from './error-page'
import MainLayout from './MainLayout'
import Login from './pages/Account/Login'
import Counter from './pages/Counter/AppForm'
import FetchData from './pages/FetchData/AppForm'
import Home from './pages/Home/AppHome'

/// To register the routing pages 
/// 預計有百多個功能選單預註冊。
export const appRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "counter", element: <Counter /> },
      { path: "fetch-data", element: <FetchData /> },
    ]
  },
];
