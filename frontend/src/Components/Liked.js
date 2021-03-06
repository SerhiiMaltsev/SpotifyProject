import { React, useState,useEffect,useContext } from "react"
import "./Liked.css"
import { Button, Divider, Typography } from '@mui/material'
import Navbar from "./Navbar"
import { AccessTokenContext } from '../Contexts/accessTokenContext';

function Liked() {
    const[songs,setSongs] = useState()
    const { accessToken } = useContext(AccessTokenContext);

    useEffect(() => {

        fetch("http://localhost:9000/user/liked?token=" + accessToken).then(res => res.json()).then(data => {console.log(data.items);setSongs(data.items);console.log(data.items)})
         
       }, [])
    return(
        <>
            <Navbar ispage={[false,false,false, false, true,false]}/> 
           <div> {songs&&
                    songs.map((song) => {
                        return ( <><img src={song.track.album.images[2].url} alt-text="Album image"></img><p><b>{song.track.name}</b><Divider/></p></>                        
                      )  })
                }</div>
        
        </>
    )
}

export default Liked