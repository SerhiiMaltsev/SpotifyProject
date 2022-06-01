import MessageIcon from '@mui/icons-material/Message';
import {React,useState} from 'react'
import {List, IconButton, Grid, Dialog, DialogActions, Button, DialogTitle, DialogContent, TextField} from '@mui/material';
import { ListItem, ListItemText } from '@mui/material'
import { Divider } from '@mui/material';

const Messageicon =()=>{
    const[popup,setPopUp] = useState(false);
    const[message,setMessage] = useState();
   
    function closewindow(e){
        e.preventDefault();
        setPopUp(!popup);
    };
  return( <>
  <MessageIcon color='secondary' onClick={e => closewindow(e)} >

      </MessageIcon>  
  <Dialog open={popup} fullWidth={30}>
            <DialogTitle> Other user's name</DialogTitle>
            <DialogContent>
                {/* can add the old texts from database later using dividers*/}
                <List  component="nav" aria-label="mailbox folders">
  <ListItem >
    <ListItemText primary="user: Hey" />
  </ListItem>

  <Divider />
  
  <ListItem  divider>
    <ListItemText primary="me: How are you?" />
  </ListItem>
  <ListItem >
    <ListItemText primary="user: ..." />
  </ListItem>
  <Divider />
  <ListItem >
    <ListItemText primary="me: ..." />
  </ListItem>
</List>
                <TextField autoFocus margin="dense" onChange={(e)=>setMessage(e.target.value)} 
                id="message" label="Enter Message" type="text" fullWidth variant="standard"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => {console.log(message); closewindow(e)}}>Send</Button>
                <Button onClick={e=>closewindow(e)}>Exit</Button>
            </DialogActions>
  </Dialog>
  </>
  )
}
export default Messageicon