import { React, useState } from 'react'
import { Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Navbar from './Navbar'
const TopMusic = () =>{
    const [sort, setSort] = useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
    };


    return(
        <>
        <Navbar/>
        <div className = "profile">
            <h1>TOP MUSIC</h1>
                <Box sx={{ minWidth: 140 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
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

            <div className = "songs">
                <h2>Top 50 Songs</h2>
                <ol>
                    <li>Song 1</li>
                    <li>Song 2</li>
                    <li>Song 3</li>
                </ol>
            </div>
            <div className = "artists">
                <h2>Top 50 Artists</h2> 
                <ol>
                    <li>Artist 1</li>
                    <li>Artist 2</li>
                    <li>Artist 3</li>
                </ol>
            </div>
        </div>
        </>
    )
}
 
export default TopMusic