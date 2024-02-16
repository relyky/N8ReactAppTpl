import { useReducer } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { zhTW } from '@mui/material/locale'
import { appRoutes } from "./AppRoutes"

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

const router = createBrowserRouter(appRoutes);

export default function App() {
  const [f_darkTheme, toggleTheme] = useReducer(mode => !mode, false) //<--- 改存入 Redux 取模式

  return (
    <ThemeProvider theme={f_darkTheme ? darkTheme : whiteTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
