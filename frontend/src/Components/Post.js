import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {React,useState} from 'react'
import {List, IconButton, Grid, Dialog, DialogActions, Button, DialogTitle, DialogContent, TextField} from '@mui/material';
import { ListItem, ListItemText } from '@mui/material'
import { Divider } from '@mui/material';
import { Typography } from '@mui/material';

const Post =(props)=>{
  const[popup,setPopUp] = useState(false);
   
  function closewindow(e){
    e.preventDefault();
    setPopUp(!popup);
  };
  
  return( 
  <>
    <TextSnippetIcon color='secondary' onClick={e => closewindow(e)} >
    </TextSnippetIcon>  
    <Dialog open={popup} fullWidth={30}>
      <DialogTitle> Author: {props.author}</DialogTitle>
      <DialogContent>
          <List component="nav" aria-label="mailbox folders">
          </List>
          <Typography>{props.text}</Typography>
          </DialogContent>
            <DialogActions>
              <Button onClick={(e) => {closewindow(e)}}>Delete</Button>
              <Button onClick={e=>closewindow(e)}>Exit</Button>
            </DialogActions>
    </Dialog>
  </>
  )
}
export default Post