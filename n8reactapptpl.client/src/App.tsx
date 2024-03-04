import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { zhTW } from '@mui/material/locale'
import { appRoutes } from "./AppRoutes"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { selectDarkTheme } from "./store/metaSlice"
import { refillLoginUserAsync, selectAuthed } from "./store/accountSlice"
import { useEffect } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
//import 'dayjs/locale/zh-tw'
import { zhTW as datefns_zhTW } from 'date-fns/locale/zh-TW'
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
  const dispatch = useAppDispatch()
  const f_darkTheme = useAppSelector(selectDarkTheme)
  const isAuthed = useAppSelector(selectAuthed)

  useEffect(() => {
    if (!isAuthed) {
      dispatch(refillLoginUserAsync())
    }
  }, [dispatch, isAuthed])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={datefns_zhTW} dateFormats={{ keyboardDate: 'yyyy-MM-dd' }} >
      <ThemeProvider theme={f_darkTheme ? darkTheme : whiteTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  )
}
