import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar.js'

function HomePage() {

    const { accessToken } = useContext(AccessTokenContext);
    const [songs, setSongs] = useState([])
    const [artists, setArtists] = useState([])
    // const [username, setUsername] = useState([])
    
    // useEffect(() => {

    //     fetch("http://localhost:9000/user?token=" + accessToken)
    //     .then(res => res.json())
    //     .then(data => setUsername(data.items))
         
    //    }, [])
    // console.log(username)

    useEffect(() => {
     fetch("http://localhost:9000/user?token=" + accessToken)
     .then(res => res.json())
     .then(data => setSongs(data.items))
    }, [])

    console.log(songs)
    return (
        <div>
            <Navbar/>
            <h1>welcome</h1>
            {songs.length > 0 &&
                songs.map((val, key) => {
                    return <p>{val.track.name} by {val.track.artists[0].name}</p>
            })
            }
            </div>
        </div>
    )
}

export default HomePage;
