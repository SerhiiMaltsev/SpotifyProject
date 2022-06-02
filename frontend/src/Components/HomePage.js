import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';

function HomePage() {

    const { accessToken } = useContext(AccessTokenContext);
    const [songs, setSongs] = useState([])
    // const {accessToken} = "BQBGVvGcaL4Usn654_rkbXcNLoJrqdHQuhi7N1wEPP9fip2GKq2_6Nsdyn0w6-7yvidZ9XFuLac-p9C2HgBgEarG7CLukZP7RRbENtKAIBA6mVbML17CQj6cJB35tdIqZShoEw84QBj1aLcM9vTrTm1OmDpcJ2V5BA2fFg_l03r5DXKZbsGWhVz7N4cKkWPXolerRRBsWYQE6AjTba8MCN1iHIKeng";
    useEffect(() => {

     fetch("http://localhost:9000/user?token=" + accessToken).then(res => res.json()).then(data => setSongs(data.items))
      
    }, [])

    console.log(songs)
    return (

        <div>
            <Navbar />
            {songs.length > 0 &&
                songs.map((val, key) => {
                    return <p>{val.track.name} by {val.track.artists[0].name}</p>
            })
            }
        </div>
    )
}

export default HomePage;
