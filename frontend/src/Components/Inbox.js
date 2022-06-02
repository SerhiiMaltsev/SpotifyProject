import Messageicon from './Messageicon'
import { Divider, Typography
 } from '@mui/material'
 import { List, ListItem, ListItemText } from '@mui/material'
import Navbar from './Navbar';

const Inbox=()=>{
    const style = {
        width: '40%',
        maxWidth: 300,
        bgcolor: 'background.paper',
        marginLeft:60,
        marginTop: 20
      };
    return(
        <>
        <Navbar/>
       <List sx={style} component="nav" aria-label="mailbox folders">
           {/* Figure out how to display dynamically */}
  <ListItem button >
    <ListItemText primary="User1" /> <Messageicon/>
  </ListItem>
  <Divider />
  <ListItem button divider>
    <ListItemText primary="User2" /><Messageicon/>
  </ListItem>
  <ListItem button>
    <ListItemText primary="User3" /><Messageicon/>
  </ListItem>
  <Divider />
  <ListItem button>
    <ListItemText primary="User4" /><Messageicon/>
  </ListItem>
  <Divider/>
</List>
        
        </>
    )
}
export default Inbox