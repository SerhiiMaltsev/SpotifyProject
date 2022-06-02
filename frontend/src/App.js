import React from 'react'
import Login from './Components/Login'
import Callback from './Components/Callback'
import HomePage from './Components/HomePage'
import { Link } from 'react-router'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AccessTokenProvider from './Contexts/accessTokenContext'
import Liked from './Components/Liked'
import TopMusic from './Components/TopMusic'
import Inbox from './Components/Inbox'
import Discover from './Components/Discover'

function App() {

  const jsx = 
    <AccessTokenProvider>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login/>}/> 
        <Route path='/home' element={<HomePage/>}/> 
        <Route path="/liked" element={<Liked />}/>
        <Route path="/topmusic" element={<TopMusic />}/>
        <Route path="/inbox" element={<Inbox />}/>
        <Route path="/discover" element = {<Discover />} />
      </Routes>
    </BrowserRouter>
    </AccessTokenProvider>


  return (
    <>
    {jsx}
    </>
  );
}

export default App;
