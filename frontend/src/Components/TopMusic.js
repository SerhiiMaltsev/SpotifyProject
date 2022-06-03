import { React, useState,useEffect,useContext } from 'react'
import { Grid, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
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
    const [lastMonth, setLastMonth] = useState(false);
    const [lastSixMonths, setLastSixMonths] = useState(true);
    const [allTime, setAllTime] = useState(false);
    useEffect(() => {
        getSongsAndArtists();
    }, [])

    const getSongsAndArtists = () => {
        if(lastSixMonths){
            console.log("Laast Six months fetched")
            fetch("http://localhost:9000/user/artists?token=" + accessToken)
            .then(res => res.json())
            .then(data => setArtists(data.items))
    
            fetch("http://localhost:9000/user/songs?token=" + accessToken).then(res => res.json()).then(data => setSongs(data.items))
            console.log("songsSixMonths", songs);
        }
        else if(allTime){
            console.log("All time fetched ")
            fetch("http://localhost:9000/user/artistsalltime?token=" + accessToken)
            .then(res => res.json())
            .then(data => setArtists(data.items))
    
            fetch("http://localhost:9000/user/songsalltime?token=" + accessToken).then(res => res.json()).then(data => setSongs(data.items))
            console.log("songsAllTime", songs);
        }
        else if(lastMonth){
            fetch("http://localhost:9000/user/artistslastmonth?token=" + accessToken)
            .then(res => res.json())
            .then(data => setArtists(data.items))
    
            fetch("http://localhost:9000/user/songslastmonth?token=" + accessToken).then(res => res.json()).then(data => setSongs(data.items))
            console.log("last months fetched");
        }
    }
    const handleChange = (event) => {
        setSort(event.target.value);
        console.log("sort", sort);
        if(String(sort) === "All Time"){
            setAllTime(true);
            setLastSixMonths(false);
            setLastMonth(false);
        }
        else if(String(sort) === "Last Six Months"){
            setAllTime(false);
            setLastSixMonths(true);
            setLastMonth(false);
        }
        else if(String(sort) === "Last Month") {
            setAllTime(false);
            setLastSixMonths(false);
            setLastMonth(true);
        }
        getSongsAndArtists();
    };
    const LikedOnClick=()=>{
        setLikePop(true)       
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
            <Navbar ispage={[false,true, false, false,false,false]}/>            
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
                    <MenuItem value={"Last Year"}>Last Six Months</MenuItem>
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
            <div className='clear'>
            <ClearIcon onClick={clickedclear}></ClearIcon></div>
            <DialogTitle><Typography variant='h3'style={{ fontWeight: 600 }}>Top 5 Songs</Typography>
            <DialogContent>
            {/* {songs.length > 0 && 
                    songs.map((val,key) => {
                    return <p>{val.name} by {val.artists[0].name}<img src={val.album.images[2].url}></img><Divider/></p>
                }) */}
            }
            </DialogContent>
</DialogTitle>

        </Dialog>
        <Dialog open={artistpop}>
        <div className='clear'>           
            <ClearIcon onClick={clickedclear}></ClearIcon></div>
          <DialogTitle><Typography style={{ fontWeight: 600 }}variant='h3'>Top 5 Artists</Typography></DialogTitle>
        <DialogContent>
        {artists &&
                    artists.map((val,key) => {
                        return <p><img src={val.images[2].url}></img>{val.name}<Divider/></p>
                    })}
        </DialogContent>
        </Dialog>
       

           
        </>
    )
}
 
export default TopMusic