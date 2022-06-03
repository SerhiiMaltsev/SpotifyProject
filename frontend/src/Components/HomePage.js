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
    const [isPriv, setIsPriv] = useState()
    const [artists, setArtists] = useState([])
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [bioPage, setBioPage] = useState("")
    const [id, setId] = useState("")


    useEffect(() => {

        fetch("http://localhost:9000/user?token=" + accessToken)
        .then(res => res.json())
        .then(data => {setUsername(data.username)
        setId(data.id)
        setBioPage(data.bio)
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

    useEffect(() =>{
       fetch("http://localhost:9000/bio/getbio?token=" + accessToken)
       .then(res => res.json())
       .then(data => setBio(data.bio))

    }, [])

    useEffect(() =>{
       fetch("http://localhost:9000/bio/getprivacy?token=" + accessToken)
       .then(res => res.json())
       .then(data => setIsPriv(!data.privacy))
       changePrivacy();
    }, [])


    const changeBio = () => {
        axios.post("http://localhost:9000/bio", {
            bio: bio,
            id: id
        })
        .then(res => res.json())
        .then(data => setBioPage(data))
        .catch((err) => console.log(err))
        setBio(bio);
    }
    const changePrivacy = async () => {
        await axios.post("http://localhost:9000/bio/privacy", {
            private: isPriv,
            id: id
        })
        setIsPriv(!isPriv)
        .catch((err) => console.log(err))
    }



    return (
        <div className ="homepage">
            <Navbar ispage={[true,false,false, false]}/>
            <div>
            <h1 className='welcome'>USER PROFILE PAGE</h1>
                <p className = 'username'>{username}</p>
                <p className='priv'>{isPriv ? 'Currently Public' : 'Currently Private'}</p>
            </div>

            <div>{bio}</div>
            <div className="buttons">
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
             <div className = 'edit'>
                 <h4 className ='editHeader'>Edit Your Bio</h4>
                <TextField id="outlined-multiline-static" label="bio" multiline maxRows={4} onChange={(e) => {setBio(e.target.value)}}/>
                <Button className = "submitbutton" size="small" variant="outlined" onClick={() => changeBio()}>SUBMIT</Button>
            <div className="buttons">
                <Button size="small" onClick = {changePrivacy}>{isPriv ? 'Change to Private' : 'Change to Public'}</Button>
            </div>
            </div>
            </div>
    </div>
    )
}

export default HomePage;
