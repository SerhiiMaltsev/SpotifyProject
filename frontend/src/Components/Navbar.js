import {React, useState} from 'react'
import { AppBar, Toolbar, IconButton, Grid, Typography, Button,Stack} from '@mui/material'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useNavigate} from 'react-router-dom'

const Navbar =()=>{
    let navigate= useNavigate();
    function inboxonClick(){
        navigate("/inbox")
      }
    function TopMusiconClick(){
        navigate("/topmusic")
      }
      //functionality should logout and bring back to the log in page but it doesn't
    function logoutonClick(){
        navigate("/")
      }
      //Functionality should take to the logged in page and it doesn't because such page does not exist
    function homeonClick(){
        navigate("/")
      }
    return(<>
    <AppBar position="static" color='secondary'>
        <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={homeonClick}>
                <LibraryMusicIcon/>
           <Typography variant='h6' fontSize={30} sx={{flexGrow: 1}}>Spotify</Typography></IconButton>
            <IconButton size='large' edge='start' padding ='100'color='inherit' aria-label='logo'>
            </IconButton>
                <Button color='inherit' onClick={TopMusiconClick} >Top Music</Button>
                <Button color='inherit' onClick={inboxonClick}>Inbox</Button>
                <Button color='inherit'>Profile</Button>
                <Button color='inherit' onClick={logoutonClick}>Logout</Button>
        </Toolbar>
    </AppBar>
    </>)
}

export default Navbar
