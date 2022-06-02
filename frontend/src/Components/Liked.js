import { React, useState,useEffect,useContext } from "react"
import "./Liked.css"
import { Button, Divider, Typography } from '@mui/material'
import Navbar from "./Navbar"
import { AccessTokenContext } from '../Contexts/accessTokenContext';

function Liked() {
    const[songs,setSongs] = useState('')
    const { accessToken } = useContext(AccessTokenContext);

    useEffect(() => {

        fetch("http://localhost:9000/user/songs?token=" + accessToken).then(res => res.json()).then(data => console.log(data))
         
       }, [])
    return(
        <>
            <Navbar ispage={[false,false,false, false, true]}/> 
           <p> {songs.length > 0 &&
                    songs.map((val, key) => {
                        return <p><b>{val.name}</b> by {val.artists[0].name}<Divider/></p>
                        
                })
                }</p>
        </>
    )
}
 
export default Liked