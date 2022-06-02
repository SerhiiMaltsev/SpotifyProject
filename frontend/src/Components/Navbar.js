import {React, useState} from 'react'
import { AppBar, Toolbar, IconButton, Grid, Typography, Button,Stack} from '@mui/material'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useNavigate} from 'react-router-dom'
import { color } from '@mui/system';

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
    return(<>
    <AppBar position="static" color='secondary'>
        <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={homeonClick}style={{backgroundColor: isPage[0] ? 'inherit' : "inherit"}}>
                <LibraryMusicIcon/>
           <Typography variant='h6' fontSize={30} sx={{flexGrow: 1}}>Spotify</Typography></IconButton>
            <IconButton size='large' edge='start' padding ='100'color='inherit' aria-label='logo'>
            </IconButton>
                <Button color='inherit' onClick={TopMusiconClick}style={{backgroundColor: isPage[1] ? 'Violet' : "inherit"}} >Top Music</Button>
                <Button color='inherit' onClick={inboxonClick}style={{backgroundColor: isPage[2] ? 'Violet' : "inherit"}}>Inbox</Button>
                <Button color='inherit' onClick={logoutonClick}>Logout</Button>
                <Button color='inherit' onClick={discoverOnClick}>Discover</Button>
        </Toolbar>
    </AppBar>
    </>)
}

export default Navbar
