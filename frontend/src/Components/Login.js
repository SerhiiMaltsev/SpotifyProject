import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { margin } from '@mui/system';
import "./Login.css"
import { AppBar, Toolbar, IconButton, Grid, Typography, Button, Stack} from '@mui/material'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

function Login() {

    const navigate = useNavigate();
    const { accessToken, setAccessToken } = useContext(AccessTokenContext);

    const onClick = (e) => {
        fetch("http://localhost:9000/auth").then(res => res.json())
        .then(data => {
            window.open(data.url)
        })
    }

    const path = window.location.href.split('/')[3]
    let code = ''
    useEffect(()=> {
        if(path){
            code = path.split('=')[1]
            fetch('http://localhost:9000/auth/callback?code='+code).then(res => res.json()).then(data => {
                if(data.token){
                    setAccessToken(data.token)
                    navigate('/home')
                }
            })
        }
    }, [])

    return (
        <div className="Login">
          <div className="Navbar">
          <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
              <LibraryMusicIcon/>
              <Typography variant='h6' fontSize={30} sx={{flexGrow: 1}}>Spotify</Typography></IconButton>
              <IconButton size='large' edge='start' padding ='100'color='inherit' aria-label='logo'>
            </IconButton>
          </Toolbar>
          </div>
          <div className="LoginButton">
            <Button onClick={(e) => onClick(e)} variant='contained' color='secondary'>Log in to App</Button>
          </div>
        </div>
    )
}

export default Login;
