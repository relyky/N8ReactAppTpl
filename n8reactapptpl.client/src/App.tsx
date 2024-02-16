import { useReducer } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { zhTW } from '@mui/material/locale'
import ErrorPage from "./error-page"
import MainLayout from './MainLayout'
import Login from './pages/Account/Login'
import Counter from './pages/Counter/AppForm'
import FetchData from './pages/FetchData/AppForm'
import Home from './pages/Home/AppHome'

//-----------------------------------------------------------------------------
//## Resource

const whiteTheme = createTheme(
  {
    palette: {
      primary: { main: '#BF4690' },
    },
  },
  zhTW, // Locale text:Use the theme to configure the locale text globally.
);

const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark',
    },
  },
  zhTW, // Locale text:Use the theme to configure the locale text globally.
);

//-----------------------------------------------------------------------------

const router = createBrowserRouter([
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
]);

export default function App() {
  //# 真正共享的實體在此建立
  const [f_darkTheme, toggleTheme] = useReducer(mode => !mode, true)

  return (
    <ThemeProvider theme={f_darkTheme ? darkTheme : whiteTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
