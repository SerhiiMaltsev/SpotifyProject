import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useEffect, useState, useContext, Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import "./HomePage.css";
import { Button, TextField } from '@mui/material';

function HomePage(){

    const { accessToken } = useContext(AccessTokenContext);
    const [songs, setSongs] = useState([])
    const [isPriv, setIsPriv] = useState(false)
    const [artists, setArtists] = useState([])
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [id, setId] = useState("")
    
    useEffect(() => {

        fetch("http://localhost:9000/user?token=" + accessToken)
        .then(res => res.json())
        .then(data => {setUsername(data.username)
        setId(data.id)
        })
         console.log(username)
       }, [])

    useEffect(() => {

     fetch("http://localhost:9000/user/songs?token=" + accessToken)
     .then(res => res.json())
     .then(data => setSongs(data.items))
      
    }, [])

    useEffect(() => {

        fetch("http://localhost:9000/user/artists?token=" + accessToken)
        .then(res => res.json())
        .then(data => setArtists(data.items))
         
       }, [])
       console.log(songs)

       console.log(artists)

    const changeBio = () => {
        axios.post("http://localhost:9000/bio", {
            bio: bio,
            id: id
        })
        .then(res => res.json())
        .then(data => setBio(data))
        .catch((err) => console.log(err))
    }

    return (
        <div className ="homepage">
            <Navbar ispage={[true,false,false, false]}/> 
            <h1 className='welcome'>welcome</h1>
                <p>{username}</p>
                <p className='priv'>{isPriv ? 'Currently Private' : 'Currently Public'}</p>
            <div className="buttons">
                <Button variant ="outlined" onClick = {() => setIsPriv(!isPriv)}>{isPriv ? 'Set Public' : 'Set Private'}</Button>
            </div>
            <div className="buttons">
                {bio}
            <div className = 'topsongs'>
                <h2>Top Songs</h2>
                {songs.length > 0 &&
                    songs.map((val, key) => {
                        return <p>{val.name} by {val.artists[0].name}</p>
                })
                }
            </div>
            <div className = 'topartists'>
                <h2>Top Artists</h2>
                {artists.length > 0 &&
                    artists.map((val, key) => {
                        return <p>{val.name}</p>
                    })}
             </div>

             <TextField id="bio" label="bio" variant="outlined" value={bio} onChange={(e) => {setBio(e.target.value)}}/>
            <Button variant="outlined" onClick={() => changeBio()}>SUBMIT</Button>
            </div>
    </div>
    )
}

export default HomePage;


