import MessageIcon from '@mui/icons-material/Message';
import {React, useState, useContext, useEffect} from 'react'
import {List, IconButton, Grid, Dialog, DialogActions, Button, DialogTitle, DialogContent, TextField} from '@mui/material';
import { ListItem, ListItemText } from '@mui/material'
import { Divider } from '@mui/material';
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import axios from 'axios';

const Messageicon =(props)=>{
    const[popup,setPopUp] = useState(false);
    const[message,setMessage] = useState("");
    const[title, setTitle] = useState("");
    const[username, setUsername] = useState("");
    const { accessToken } = useContext(AccessTokenContext);

    function closewindow(e){
        e.preventDefault();
        setPopUp(!popup);
    };

    function sendMessage(){
      var timeInMs = Date.now();
      axios.post("http://localhost:9000/user/sendmessage/", {
        sender: username,
        recipient: props.recipient,
        title: title,
        body: message,
        time: timeInMs
      })
      .then((res) => console.log(res.data))
    }

    useEffect(() => {

      fetch("http://localhost:9000/user/getusername?token=" + accessToken)
      .then(res => res.json())
      .then(data => setUsername(data.username))

    }, [])

    return(
      <>

        <MessageIcon color='secondary' onClick={e => closewindow(e)}></MessageIcon>
        <Dialog open={popup} fullWidth={30}>
          <DialogTitle>{username} to {props.recipient}</DialogTitle>
          <DialogContent>
            <List  component="nav" aria-label="mailbox folders">
            </List>
            <TextField autoFocus margin="dense" onChange={(e)=>setTitle(e.target.value)} id="title" label="Enter Title" type="text" fullWidth variant="standard"/>
            <TextField autoFocus margin="dense" onChange={(e)=>setMessage(e.target.value)} id="message" label="Enter Message" type="text" fullWidth variant="standard"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => {sendMessage(); closewindow(e)}}>Send</Button>
            <Button onClick={e=>closewindow(e)}>Exit</Button>
          </DialogActions>
        </Dialog>
      </>
  )
}

export default Messageicon
