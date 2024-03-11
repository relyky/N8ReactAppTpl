import { FC, ReactNode, useState } from "react"
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom"
import { useAppDispatch } from "./store/hooks";
import { logoutAsync } from "./store/accountSlice";
// Icons
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import MenuGroupIcon from '@mui/icons-material/GridViewRounded'

export default function NavMenu() {
  const dispatch = useAppDispatch()
  return (
    <div>
      <Toolbar /> {/* hat */}
      <Divider textAlign='left'>功能選單</Divider>
      <List>
        <ListMenuGroup label='展示功能'>
          <ListMenuItem label='展示功能０１' to='/demo01' />
          <ListMenuItem label='展示功能０２' to='/demo02' />
          <ListMenuItem label='展示功能０３' to='/demo03' />
          <ListMenuItem label='展示功能０５' to='/demo05' />
          <ListMenuItem label='Lab 01' to='/lab01' />
          <ListMenuItem label='Counter' to='/counter' />
        </ListMenuGroup>

        <ListMenuGroup label='展示功能２'>
          <ListMenuItem label='Counter 1' to='/counter' />
          <ListMenuItem label='Fetch data 1' to='/fetch-data' />
          <ListMenuItem label='Counter 2' to='/counter' />
          <ListMenuItem label='Fetch data 2' to='/fetch-data' />
          <ListMenuItem label='Counter ' to='/counter' />
          <ListMenuItem label='Fetch data 3' to='/fetch-data' />
        </ListMenuGroup>

        <ListMenuGroup label='展示功能３'>
          <ListMenuItem label='Counter 1' to='/counter' />
          <ListMenuItem label='Fetch data 1' to='/fetch-data' />
          <ListMenuItem label='Counter 2' to='/counter' />
          <ListMenuItem label='Fetch data 2' to='/fetch-data' />
          <ListMenuItem label='Counter ' to='/counter' />
          <ListMenuItem label='Fetch data 3' to='/fetch-data' />
          <ListMenuItem label='Counter 1' to='/counter' />
          <ListMenuItem label='Fetch data 1' to='/fetch-data' />
          <ListMenuItem label='Counter 2' to='/counter' />
          <ListMenuItem label='Fetch data 2' to='/fetch-data' />
          <ListMenuItem label='Counter ' to='/counter' />
          <ListMenuItem label='Fetch data 3' to='/fetch-data' />
          <ListMenuItem label='Counter 1' to='/counter' />
          <ListMenuItem label='Fetch data 1' to='/fetch-data' />
          <ListMenuItem label='Counter 2' to='/counter' />
          <ListMenuItem label='Fetch data 2' to='/fetch-data' />
          <ListMenuItem label='Counter ' to='/counter' />
          <ListMenuItem label='Fetch data 3' to='/fetch-data' />
        </ListMenuGroup>
      </List>

      <Divider textAlign='left'>系統</Divider>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon children={<HomeIcon color='primary' />} />
            <ListItemText primary='首頁' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/login">
            <ListItemIcon children={<LoginIcon color='primary' />} />
            <ListItemText primary='登入' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(logoutAsync())}>
            <ListItemIcon children={<LogoutIcon color='primary' />} />
            <ListItemText primary='登出' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/labbing">
            <ListItemIcon children={<HomeIcon color='primary' />} />
            <ListItemText primary='臨床實驗室' />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

const ListMenuGroup: FC<{ label: string, children: ReactNode }> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ListItemButton onClick={() => setOpen(f => !f)}>
        <ListItemIcon children={<MenuGroupIcon color='primary' />} />
        <ListItemText primary={props.label} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.children}
          {/*  
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/counter"  >
            <ListItemText primary='Counter' />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/fetch-data"  >
            <ListItemText primary='Fetch data' />
          </ListItemButton>            
          */}
        </List>
      </Collapse>
    </>
  )
}

/*
<ListItemButton sx={{ pl: 4 }} component={Link} to="/fetch-data"  >
  <ListItemText primary='Fetch data' />
</ListItemButton>
*/
const ListMenuItem: FC<{
  label: string,
  to: string
}> = (props) => (
  <ListItemButton sx={{ pl: 4 }} component={Link} to={props.to}  >
    <ListItemText primary={props.label} />
  </ListItemButton>
)
