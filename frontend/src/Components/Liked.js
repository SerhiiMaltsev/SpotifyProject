import { React, useState } from "react"
import "./Liked.css"
import { Button } from '@mui/material'

function Liked() {

    return(
        <div className = "liked">
            <div>
                    <h1>liked songs</h1>
            </div>
            <div className = "songsLiked">
                <ol>
                    <li>Song 1</li>
                    <li>Song 2</li>
                    <li>Song 3</li>
                </ol>
            </div>
        </div>

    )
}
 
export default Liked