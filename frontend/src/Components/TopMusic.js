import { React, useState,useEffect,useContext } from 'react'
import { Grid, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, Dialog, DialogTitle } from '@mui/material'
import Navbar from './Navbar'
import './TopMusic.css'
import { AccessTokenContext } from '../Contexts/accessTokenContext';
import ClearIcon from '@mui/icons-material/Clear';

const TopMusic = () =>{
    const [sort, setSort] = useState('');
    const [songs,setSongs] = useState('');
    const { accessToken } = useContext(AccessTokenContext);
    const [likepop, setLikePop] = useState(false);
    const [artistpop, setArtistPop] = useState(false);

    useEffect(() => {

        fetch("http://localhost:9000/user?token=" + accessToken).then(res => res.json()).then(data => setSongs(data.items))
         
       }, [])
    const handleChange = (event) => {
        setSort(event.target.value);
    };
    const LikedOnClick=()=>{
        setLikePop(true)
        console.log(likepop)
        {songs.length > 0 &&
            songs.map((val, key) => {
                return <p>{val.track.name} by {val.track.artists[0].name}</p>
        })
        }
    }
    const ArtistsOnClicked=()=>{
        setArtistPop(true)
    }

    const clickedclear=()=>{
        setLikePop(false)
        setArtistPop(false)
    }

    return(
        <>
            <Navbar ispage={[false,true, false, false]}/>            
        <div className='title'>
            <Typography variant='h3'>Top Music</Typography></div>
                <Box sx={{ minWidth: 40 }}>
                <FormControl fullWidth color='secondary'>
                    <InputLabel id="demo-simple-select-label" placeholder='Sort'>Sort</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort"
                    onChange={handleChange}
                    >
                    <MenuItem value={"All Time"}>All Time</MenuItem>
                    <MenuItem value={"Last Year"}>Last Year</MenuItem>
                    <MenuItem value={"Last Month"}>Last Month</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <div className='LBtn'>
        <Button variant='contained' color='secondary'style={{
          maxWidth: "100px",
          maxHeight: "100px",
          minWidth: "100px",
          minHeight: "100px"
        }} onClick={LikedOnClick}>Top 5 Songs</Button></div> 
        <div className='ABtn'>
        <Button variant='contained' color='secondary'style={{
          maxWidth: "100px",
          maxHeight: "100px",
          minWidth: "100px",
          minHeight: "100px"
        }} onClick={ArtistsOnClicked}>Top 5 Artists</Button></div>

        <Dialog open={likepop}>
            <Grid marginLeft={16}marginTop={1}>
            <ClearIcon onClick={clickedclear}></ClearIcon></Grid>
            <DialogTitle><Typography variant='h6'>Top 5 Songs</Typography></DialogTitle>

        </Dialog>
        <Dialog open={artistpop}>
            <Grid marginLeft={16}marginTop={1}>
            <ClearIcon onClick={clickedclear}></ClearIcon></Grid>
            <DialogTitle><Typography variant='h6'>Top 5 Artists</Typography></DialogTitle>

        </Dialog>
       

           
        </>
    )
}
 
export default TopMusic