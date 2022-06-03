import {React, useState} from 'react'
import { AppBar, Toolbar, IconButton, Grid, Typography, Button,Stack} from '@mui/material'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useNavigate} from 'react-router-dom'
import { color } from '@mui/system';
import './Navbar.css'
const Navbar =(props)=>{
    const [isPage, setPage] = useState(props.ispage)
    let navigate= useNavigate();
    function inboxonClick(){
        navigate("/inbox")
      }
    function TopMusiconClick(){
        navigate("/topmusic")
        
      }
    function logoutonClick(){
        navigate("/")
      }
    function homeonClick(){
        navigate("/home")
      }
    const discoverOnClick = () => {
      navigate("/discover")
    }
    const LikedOnClick = () => {
      navigate("/liked")}
    const forumOnClick = () => {
      navigate("/forum")
    }
    return(<>
    <AppBar position="static" color='secondary'>
        <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={homeonClick}style={{backgroundColor: isPage[0] ? 'inherit' : "inherit"}}>
                <LibraryMusicIcon/>
           <Typography variant='h6' fontSize={30} sx={{flexGrow: 1}}>Friendify</Typography></IconButton>
            <IconButton size='large' edge='start' padding ='100'color='inherit' aria-label='logo'>
            </IconButton>
            <div className='topMusic'> <Button color='inherit' onClick={TopMusiconClick}style={{backgroundColor: isPage[1] ? 'Violet' : "inherit"}} >Top Music</Button></div>
                <div className='inbox'> <Button color='inherit' onClick={inboxonClick}style={{backgroundColor: isPage[2] ? 'Violet' : "inherit"}}>Inbox</Button></div>
                <div className='discover'><Button color='inherit' onClick={discoverOnClick}style={{backgroundColor: isPage[3] ? 'Violet' : "inherit"}}>Discover</Button></div>
                <div className='liked'><Button color='inherit' onClick={LikedOnClick}style={{backgroundColor: isPage[4] ? 'Violet' : "inherit"}}>Liked</Button></div>
                <div className='forum'><Button color='inherit' onClick={forumOnClick}style={{backgroundColor: isPage[5] ? 'Violet' : "inherit"}}>Forum</Button></div>
                <div className='logout'><Button color='inherit' onClick={logoutonClick}>Logout</Button></div>

        </Toolbar>
    </AppBar>
    </>)
}

export default Navbar
