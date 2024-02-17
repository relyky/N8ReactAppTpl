import { useState } from 'react'
import type { FC } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Drawer, IconButton, Typography, Toolbar, useMediaQuery, Divider, Alert, Backdrop, CircularProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectBlocking, selectDarkTheme, selectTopAlert, setTopAlert, toggleTheme } from './store/metaSlice';
import NavMenu from './NavMenu'
// Icons
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DarkIcon from '@mui/icons-material/DarkMode'
import LightIcon from '@mui/icons-material/LightMode'

const drawerWidth = 240;
const sysVersion: string = 'Version 0.0.1-alpha'

export default function ResponsiveDrawer() {
  const theme = useTheme();
  const matcheSmUp = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useAppDispatch()
  const f_darkTheme = useAppSelector(selectDarkTheme)
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setOpen(f => !f);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
            Logo
          </Typography>

          <IconButton
            size="large"
            onClick={() => dispatch(toggleTheme())}
            color="inherit"
          >
            {f_darkTheme ? <DarkIcon /> : <LightIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* nav */}
      <Box component="nav" sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 }
      }}>
        <Drawer
          variant={matcheSmUp ? 'persistent' : 'temporary'}
          open={open}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <NavMenu />
        </Drawer>
      </Box>

      {/* main */}
      <Main open={open} matcheSmUp={matcheSmUp}>
        <Toolbar /> {/* hat */}
        <TopAlert />
        <Outlet />
        <Overlay />
        {/* footer */}
        <Divider variant="middle" sx={{ my: 1 }} />
        <footer style={{ textAlign: 'center' }} >
          <Typography variant='caption'>
            Copyright &copy; 2024 亞洲志遠科技 {sysVersion}<br />
            最佳瀏覽器 Chrome, Edge, Safari。</Typography>
        </footer>
      </Main>
    </Box>
  );
}

//-----------------------------------------------------------------------------
/// ref→[Material - Drawer](https://mui.com/material-ui/react-drawer/)
/// ref→[Material - App Bar](https://mui.com/material-ui/react-app-bar/)
const Main = styled('main')<{
  open: boolean,
  matcheSmUp: boolean
}>(({ theme, open, matcheSmUp }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: matcheSmUp ? `-${drawerWidth}px` : 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

//-----------------------------------------------------------------------------
const TopAlert: FC = () => {
  const dispatch = useAppDispatch()
  const topAlert = useAppSelector(selectTopAlert)

  if (!topAlert) return; // 不顯示離開。
  return (
    <Alert severity={topAlert.severity}
      variant='filled'
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            dispatch(setTopAlert(null))
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>
      {topAlert.text}
    </Alert>
  )
}

//-----------------------------------------------------------------------------
const Overlay: FC = () => {
  const blocking = useAppSelector(selectBlocking)
  return (
    <Backdrop
      sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={blocking}
    >
      <CircularProgress color="inherit" size='6rem' />
    </Backdrop>
  )
}