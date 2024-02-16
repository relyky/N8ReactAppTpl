import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList, Toolbar } from "@mui/material";
import { Link } from "react-router-dom"
// Icons
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

export default function NavMenu() {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts', 'All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon children={<MailIcon />} />
            <ListItemText primary='首頁' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/counter">
            <ListItemIcon children={<MailIcon />} />
            <ListItemText primary='Counter' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/fetch-data">
            <ListItemIcon children={<MailIcon />} />
            <ListItemText primary='Fetch data' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <MenuList>
        <MenuItem component={Link} to="/login">
          <ListItemIcon children={<InboxIcon />} />
          <ListItemText>登入</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/logout">
          <ListItemIcon children={<InboxIcon />} />
          <ListItemText>登出</ListItemText>
        </MenuItem>
      </MenuList>
    </div>
  );
}
