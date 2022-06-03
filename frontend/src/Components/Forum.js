// import React from 'react'
// import { useEffect, useState } from 'react'
// import Messageicon from './Messageicon'
// import { Divider, Typography
//  } from '@mui/material'
//  import { List, ListItem, ListItemText } from '@mui/material'
// import Navbar from './Navbar';
// import Post from './Post'

// const Forum = () => {
  
//   const [discussions, setDiscussions] = useState([]);

//       useEffect(() =>{
//           fetch("http://localhost:9000/getdiscussions")
//        .then(res => res.json())
//        .then(data => setDiscussions(data))
//       },[])
//       console.log("discussions", discussions)
//     return(
//         <>
//        <List sx={style} component="nav" aria-label="mailbox folders">
//         {discussions.map((disc) => {
//           return(
//             <ListItem button >
//               <ListItemText primary={disc.title} /> <Post author={disc.author} text = {disc.text}/>
//             </ListItem>
//           )
//         })}
//       </List>
        
//         </>)
// }

import { Button, Dialog, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import {React, useState, useEffect} from "react";
import axios from "axios"
import './Forum.css'
import ClearIcon from '@mui/icons-material/Clear';
import Navbar from './Navbar'
const Forum =()=>{
  
  const [Name, setName] = useState('');
    const [Message,setMessage] = useState('');
    const [Title,setTitle]= useState('');
    const [Info,setInfo] = useState('');
    const[Add,setAdd] = useState('')
  
    useEffect(() => {
        fetch('demos/messages')
        .then((res) => res.json())
        .then((text) => {console.log(text) ; setInfo(text.result)})
        .catch((err) => console.log(err))
      }, [])
    const handleSubmit=()=>{
      axios.post('demos/post',{
        username: Name,
        message:Message
      })
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
    }

    const addPopUp=()=>{
      setAdd(true)
    }
    const closeAdd=()=>{
      setAdd(false)
    }
  return(
  <>
      <Navbar ispage={[false,false,false,false,false,true]}/>            
      <div className="addPost"><Button variant="contained"color='secondary' onClick={addPopUp}>Add Post</Button></div>
     <Dialog open={Add}>
     <div className="clear"><ClearIcon onClick={closeAdd}></ClearIcon></div>

       <DialogTitle><Typography variant="h4">Add New Post</Typography></DialogTitle>

      <div className="name"><TextField placeholder="Name" margin='normal'onChange={(e) => {setName(e.target.value)}}>Name</TextField></div>
      <div className="title"><TextField placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}>Title</TextField></div>
      <div className="message"><TextField placeholder="Message" onChange={(e) => {setMessage(e.target.value)}}>Message</TextField></div>
      
  
      <div className="addbtn">
      <Button variant="contained" color= 'secondary'onClick={handleSubmit}>Post</Button>
     
      </div>
      </Dialog>
      {Info && Info.map((item)=> <div className="messages">
        <Typography >Name:  {item.username} <br></br> 
        Title: {item.title} <br></br>   
      Message:  {item.message}</Typography></div>
      )}

      </>)
}
export default Forum
