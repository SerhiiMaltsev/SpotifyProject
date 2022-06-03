import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useEffect, useState, useContext, Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import "./HomePage.css";

function HomePage(){

    const { accessToken } = useContext(AccessTokenContext);
    const [songs, setSongs] = useState([])

    const [artists, setArtists] = useState([])
    const [username, setUsername] = useState("")
    
    useEffect(() => {

        fetch("http://localhost:9000/user?token=" + accessToken)
        .then(res => res.json())
        .then(data => setUsername(data))
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


    
    return (

        <div className ="homepage">
            <Navbar ispage={[true,false,false, false, false,false]}/> 
            <h1 className='welcome'>welcome</h1>
            <p>{username}</p>
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
    </div>
    )
}

export default HomePage;


