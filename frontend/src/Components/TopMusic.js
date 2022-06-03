import { React, useState,useEffect,useContext } from 'react'
import { Grid, Paper,Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
import Navbar from './Navbar'
import './TopMusic.css'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import ClearIcon from '@mui/icons-material/Clear';
import { Divider } from '@mui/material';

const TopMusic = () =>{
    const [sort, setSort] = useState('');
    const [songs,setSongs] = useState([]);
    const[artists,setArtists] = useState([]);
    const { accessToken } = useContext(AccessTokenContext);
    const [likepop, setLikePop] = useState(false);
    const [artistpop, setArtistPop] = useState(false);
    useEffect(() => {

        fetch("http://localhost:9000/user/artists?token=" + accessToken)
        .then(res => res.json())
        .then(data => setArtists(data.items))
         
       }, [])

    useEffect(() => {

        fetch("http://localhost:9000/user/songs?token=" + accessToken).then(res => res.json()).then(data => setSongs(data.items))
         
       }, [])
    const handleChange = (event) => {
        setSort(event.target.value);
    };
    const LikedOnClick=()=>{
        setLikePop(true)
        setArtistPop(false)
        
    }
    const ArtistsOnClicked=()=>{
        setArtistPop(true)
        setLikePop(false)
    }

    
   
    return(
        <>
        <Navbar ispage={[false,true, false, false,false,false]}/>            

                <div className='select'><Box sx={{ maxWidth: 400 }}>
                <FormControl fullWidth color='secondary'>
                    <InputLabel id="demo-simple-select-label" placeholder='Sort'>Sort</InputLabel>
                    <Select
                    id="demo-simple-select"
                    value={sort}
                    label='sort'
                    onChange={handleChange}
                    >
                    <MenuItem value={ArtistsOnClicked}>Top Artists</MenuItem>
                    <MenuItem value={LikedOnClick}>Top Songs</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                </div>
        <Paper elevation={0}>
            
            {likepop&&songs &&
                    songs.map((val,key) => {
                        return <p><img src={val.album.images[2].url}></img><br></br>{val.name} by {val.artists[0].name}<Divider/></p>
                })
                }
            {artistpop && artists &&
                    artists.map((val,key) => {
                        return <p><img src={val.images[2].url}></img><br></br>{val.name}<Divider/></p>
                })}
           
        </Paper>
     
       

           
        </>
    )
}
 
export default TopMusic