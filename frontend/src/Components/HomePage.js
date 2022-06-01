import React from 'react'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function HomePage() {
    
    const { accessToken } = useContext(AccessTokenContext);
    const [songs, setSongs] = useState([])
    // const {accessToken} = "BQBGVvGcaL4Usn654_rkbXcNLoJrqdHQuhi7N1wEPP9fip2GKq2_6Nsdyn0w6-7yvidZ9XFuLac-p9C2HgBgEarG7CLukZP7RRbENtKAIBA6mVbML17CQj6cJB35tdIqZShoEw84QBj1aLcM9vTrTm1OmDpcJ2V5BA2fFg_l03r5DXKZbsGWhVz7N4cKkWPXolerRRBsWYQE6AjTba8MCN1iHIKeng";
    useEffect(() => {
     fetch("/user?token=" + "BQAhSZddqFDVYpfhBEya4YSA17zI5aQdxUcVVZixmrSgMxSZ4u004Ry8Yz8xEaLhDWCRaaLDsuDI6T-Fv-DI3ulT6wmso3xDp6Z0uNm2FL7OOudHaa6gqRBNkkyKsGj1ywYVXmZOSpCFwNYX9uFKg4fetukKz1IMMxc").then(res => res.json()).then(data => setSongs(data.items))
    }, [])
    // useEffect(() => {
    //     fetch("/user?token=" + {accessToken}).then(res => res.json()).then(data => setSongs(data.items))
    //    }, [])
   console.log("access token", accessToken);
   console.log(songs)
    return (
        <div>
            <h1>welcome</h1>
            {songs.length > 0 && 
                songs.map((val, key) => {
                    return <p>{val.track.name} by {val.track.artists[0].name}</p>
            })
            }
        </div>
    )
}

export default HomePage;