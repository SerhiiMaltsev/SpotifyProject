import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import { List, ListItem, ListItemText } from '@mui/material'
import Messageicon from './Messageicon'
import { AccessTokenContext } from '../Contexts/accessTokenContext';

const style = {
    width: '40%',
    maxWidth: 300,
    bgcolor: 'background.paper'
  };


const Discover = () => {
    const { accessToken } = useContext(AccessTokenContext);
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:9000/getusers")
     .then(res => res.json())
     .then(data => setUsers(data))
    },[])

    console.log(users);
    return(
        <div class = "Discover">
            <Navbar ispage={[false,false,false, true]}/>
            <List sx={style} component="nav" aria-label="mailbox folders">
            {users.map((user, key) => { return(
              <ListItem button >
                <ListItemText primary={user.name}/>
                <Messageicon recipient={user.name}/>
              </ListItem>
            )})}
            </List>
        </div>
    )

}
export default Discover
