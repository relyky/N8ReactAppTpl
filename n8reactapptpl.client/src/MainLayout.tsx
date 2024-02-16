import { useDebugValue, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Drawer, IconButton, Typography, Toolbar, useMediaQuery } from '@mui/material'
// Icons
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet } from 'react-router-dom'
import NavMenu from './NavMenu'

const drawerWidth = 240;

/// ref¡÷[Material - Drawer](https://mui.com/material-ui/react-drawer/)
/// ref¡÷[Material - App Bar](https://mui.com/material-ui/react-app-bar/)
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

export default function ResponsiveDrawer() {
  const theme = useTheme();
  const matcheSmUp = useMediaQuery(theme.breakpoints.up('sm'));
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

  useDebugValue({ open, matcheSmUp })
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
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Logo
          </Typography>
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
        <Outlet />
      </Main>
    </Box>
  );
}
