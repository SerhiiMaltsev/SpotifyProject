import Messageicon from './Messageicon'
import { Divider, Typography } from '@mui/material'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { List, ListItem, ListItemText } from '@mui/material'
import Navbar from './Navbar';
import { useEffect, useState, useContext } from 'react';
import axios from "axios";

const style = {
    width: '40%',
    maxWidth: 300,
    bgcolor: 'background.paper'
  };

const Inbox=()=>{
    const { accessToken } = useContext(AccessTokenContext);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
      axios.post("http://localhost:9000/user/getinbox?token=" + accessToken, {
        username: username
      })
      .then((res) => setMessages(res.data))

    }, [])


    return(
        <div className="Inbox">
          <Navbar ispage={[false,false,true]}/>
          {Object.entries(messages)
            .map(([key, value]) =>(
            <p>
              <p><b>From:</b> {value.sender} </p>
              <p><b>Recipient:</b> {value.recipient} </p>
              <p><b>Title:</b> {value.title} </p>
              <p><b>Date:</b> {value.time} </p>
              <p>{value.message}</p>
              <Divider/>
            </p>
          ))}
        </div>
    )
}
export default Inbox
