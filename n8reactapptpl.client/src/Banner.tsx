import { useState, type FC } from "react"
import { useNavigate } from "react-router-dom"
import { AppBar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useAtomValue } from "jotai"
import { accountAtom, selectAuthed, selectAuthing, useAccountAction } from "./atoms/accountAtom"
import { selectDarkTheme, useMetaAction } from "./atoms/metaAtom"
// Icons
import MenuIcon from '@mui/icons-material/Menu'
import DarkIcon from '@mui/icons-material/DarkMode'
import LightIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import AccountIcon from '@mui/icons-material/AccountCircle'
import SettingIcon from '@mui/icons-material/Settings'
import LoopIcon from '@mui/icons-material/Loop'

export default function Banner(props: {
  onOpenDrawer: () => void
}) {
  const navigate = useNavigate()
  const isAuthed = useAtomValue(selectAuthed)
  const isAuthing = useAtomValue(selectAuthing)
  const accountState = useAtomValue(accountAtom)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logoutAsync } = useAccountAction()
  const f_darkTheme = useAtomValue(selectDarkTheme)
  const { toggleTheme } = useMetaAction()

  return (
    <>
      {/* banner */}
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
            onClick={props.onOpenDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
            Logo
          </Typography>

          {isAuthing ?
            <IconButton color="inherit" title="驗證中...">
              <LoopSpinIcon />
            </IconButton>
            : isAuthed ?
              <>
                <IconButton color="inherit" title={accountState.loginUserName} onClick={e => setAnchorEl(e.currentTarget)}>
                  <AccountIcon />
                </IconButton>
                <Typography variant='body2'>
                  {accountState.loginUserName}
                </Typography>
              </>
              :
              <IconButton color="inherit" title="登入" onClick={handleLogin}>
                <LoginIcon />
              </IconButton>
          }

          <IconButton color="inherit" onClick={() => toggleTheme()}>
            {f_darkTheme ? <DarkIcon /> : <LightIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon children={<AccountIcon color='disabled' />} />
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon children={<SettingIcon color='disabled' />} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon children={<LogoutIcon color='primary' />} />
          登出
        </MenuItem>
      </Menu>
    </>
  )

  function handleLogin() {
    navigate('login')
  }

  async function handleLogout() {
    await logoutAsync()
  }
}

//-----------------------------------------------------------------------------
const LoopSpinIcon: FC = () => (
  <LoopIcon sx={{
    animation: "spin 2s linear infinite",
    "@keyframes spin": {
      "0%": {
        transform: "rotate(360deg)",
      },
      "100%": {
        transform: "rotate(0deg)",
      },
    },
  }} />
)