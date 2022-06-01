import {React, useState} from 'react'
import { AppBar, Toolbar, IconButton, Grid, Typography, Button,Stack} from '@mui/material'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
const Navbar =()=>{
    return(<>
    <AppBar position="static" color='secondary'>
        <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                <LibraryMusicIcon/>
            
           <Typography variant='h6' fontSize={30} sx={{flexGrow: 1}}>Spotify</Typography></IconButton>
            <IconButton size='large' edge='start' padding ='100'color='inherit' aria-label='logo'>
            </IconButton>
            <Stack direction='row' spacing={2} marginX={125}>
                <Button color='inherit'>Profile</Button>
            </Stack>
            
        </Toolbar>
    </AppBar>


    </>)
}
 
export default Navbar