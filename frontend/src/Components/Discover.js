import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Discover = () => {

    const [users, setUsers] = useState();
    
    useEffect(() =>{
        fetch("http://localhost:9000/getusers")
     .then(res => res.json())
     .then(data => setUsers(data))
    },[])
    console.log(users);
    return(
        <div class = "Discover">
            <Navbar />
            {users.map((user) => {
                return <p>{user.name}</p>
            })}
        </div>

    )
}
export default Discover
