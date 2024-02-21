import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { zhTW } from '@mui/material/locale'
import { appRoutes } from "./AppRoutes"
import { useAppSelector } from "./store/hooks"
import { selectDarkTheme } from "./store/metaSlice"

//-----------------------------------------------------------------------------
// �b����ŧi ResponseError ���O�C
// ���`�N�G�u���u���ŧi�Ӥw�C��@�b index.html�C
declare global {
  class ResponseError extends Error {
    status: number;
    statusText: string;
    message: string;

    constructor(message: string, status: number, statusText: string);
  }
}
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
  const f_darkTheme = useAppSelector(selectDarkTheme)

  return (
    <ThemeProvider theme={f_darkTheme ? darkTheme : whiteTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
