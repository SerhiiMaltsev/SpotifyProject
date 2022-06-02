import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Discover = () => {

    const [users, setUsers] = useState();
    
    useEffect(() =>{
        fetch('http://localhost:9000/').then(res => res.json()).then(data => setUsers(data.items))
    },[])
    return(
        <div class = "Discover">
            <Navbar />
        </div>

    )
}
export default Discover
