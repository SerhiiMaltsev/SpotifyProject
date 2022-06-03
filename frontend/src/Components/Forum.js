import { Button, Dialog, DialogTitle, Divider, Grid, TextField, Typography } from "@mui/material";
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
        fetch('http://localhost:9000/discussion/messages')
        .then((res) => res.json())
        .then((text) => {console.log(text) ; setInfo(text.result)})
        .catch((err) => console.log(err))
      }, [])
    const handleSubmit=()=>{
      axios.post('http://localhost:9000/discussion/post',{
        name: Name,
        title: Title,
        message:Message
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
    function addClick(e){
      e.preventDefault();
      setAdd(false);
  };
  return(
  <>
      <Navbar ispage={[false,false,false,false,false,true]}/>            
      <div className="addPost"><Button variant="contained"color='secondary' onClick={addPopUp}>Add Post</Button></div>
     <Dialog open={Add}>
     <div className="clear"><ClearIcon onClick={closeAdd}></ClearIcon></div>

       <DialogTitle><Typography variant="h4">Add New Post</Typography></DialogTitle>

      <div className="name"><TextField placeholder="Name" color='secondary'onChange={(e) => {setName(e.target.value)}}>Name</TextField></div>
      <div className="title"><TextField placeholder="Title"color='secondary' onChange={(e) => {setTitle(e.target.value)}}>Title</TextField></div>
      <div className="message"><TextField placeholder="Message"color='secondary' onChange={(e) => {setMessage(e.target.value)}} multiline>Message</TextField></div>
      
  
      <div className="addbtn">
      <Button variant="contained" color= 'secondary'onClick={(e) => {handleSubmit(); addClick(e)}}>Post</Button>
     
      </div>
      </Dialog>
      {Info && Info.map((item)=> <div className="messages">
        <Typography ><Divider/><b>Name:</b>  {item.name} <br></br> 
        <b>Title:</b> {item.title} <br></br>   
      <b>Message:</b>  {item.message}</Typography><Divider/></div>
      )}

      </>)
}
export default Forum
