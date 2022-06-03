import React from 'react'
import { useEffect, useState } from 'react'
import Messageicon from './Messageicon'
import { Divider, Typography
 } from '@mui/material'
 import { List, ListItem, ListItemText } from '@mui/material'
import Navbar from './Navbar';
import Post from './Post'

const Forum = () => {
  const style = {
    width: '40%',
    maxWidth: 300,
    bgcolor: 'background.paper',
    marginLeft:60,
    marginTop: 20
  };
  const [discussions, setDiscussions] = useState([]);

      useEffect(() =>{
          fetch("http://localhost:9000/getdiscussions")
       .then(res => res.json())
       .then(data => setDiscussions(data))
      },[])
      console.log("discussions", discussions)
    return(
        <>
        <Navbar ispage={[false,false,false,false,false,true]}/>            
       <List sx={style} component="nav" aria-label="mailbox folders">
        {discussions.map((disc) => {
          return(
            <ListItem button >
              <ListItemText primary={disc.title} /> <Post author={disc.author} text = {disc.text}/>
            </ListItem>
          )
        })}
      </List>
        
        </>)
}
export default Forum