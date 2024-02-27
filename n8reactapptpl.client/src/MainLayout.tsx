import { useState } from 'react'
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer, IconButton, Typography, Toolbar, useMediaQuery, Divider, Alert, Backdrop, CircularProgress, Container } from '@mui/material'
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectBlocking, selectTopAlert, setTopAlert } from './store/metaSlice';
import { selectAuthed } from './store/accountSlice';
import Banner from './Banner';
import NavMenu from './NavMenu'
// Icons
import CloseIcon from '@mui/icons-material/Close'

const drawerWidth = 240;
const sysVersion: string = 'Version 0.0.1-alpha'

export default function ResponsiveDrawer() {
  const theme = useTheme();
  const matchXs = useMediaQuery(theme.breakpoints.only('xs'))
  const [open, setOpen] = useState(() => matchXs ? false : true) // 畫面開啟時，若是`手機模式`則預設不顯示選單。
  const [isClosing, setIsClosing] = useState(false)
  const isAuthed = useAppSelector(selectAuthed)

  function handleDrawerClose() {
    setIsClosing(true);
    setOpen(false);
  }

  function handleDrawerTransitionEnd() {
    setIsClosing(false);
  }

  function toggleDrawer() {
    if (!isClosing) {
      setOpen(f => !f);
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <Banner onOpenDrawer={toggleDrawer} />

      {/* nav */}
      <Box component="nav" sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 }
      }}>
        <Drawer
          variant={matchXs ? 'temporary' : 'persistent'}
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
      <Main open={open} matchXs={matchXs}>
        <Toolbar /> {/* hat */}
        <TopAlert />
        {isAuthed
          ? <Outlet />
          : <NotAuthorized />}
        {/* footer */}
        <Divider variant="middle" sx={{ my: 1 }} />
        <footer style={{ textAlign: 'center' }} >
          <Typography variant='caption'>
            Copyright &copy; 2024 亞洲志遠科技 {sysVersion}<br />
            最佳瀏覽器 Chrome, Edge, Safari。</Typography>
        </footer>
      </Main>
      <Overlay />
    </Box>
  );
}

//-----------------------------------------------------------------------------
/// ref→[Material - Drawer](https://mui.com/material-ui/react-drawer/)
/// ref→[Material - App Bar](https://mui.com/material-ui/react-app-bar/)
const Main = styled('main')<{
  open: boolean,
  matchXs: boolean
}>(({ theme, open, matchXs }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: matchXs ? 0 : `-${drawerWidth}px`,
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

//-----------------------------------------------------------------------------
const NotAuthorized: FC = () => {
  return (
    <Container>
      <Typography variant='h1'>401 NotAuthorized</Typography>
    </Container>
  )
}

