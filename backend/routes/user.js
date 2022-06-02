var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var auth = require('./auth')
var dotenv = require('dotenv').config()
const db = require("./firebase")

const {getDocs, setDoc, doc, collection, deleteDoc, updateDoc} = require("firebase/firestore")

router.get('/', async (req, res, next) => {
    try{
        var username = ""
        var id = ""
        await fetch('https://api.spotify.com/v1/me', {
           method: 'GET',
           headers: {
             'Accept': 'application/json',
             "Content-Type" : "application/json",
             "Authorization": "Bearer " + req.query.token
           },
         })
         .then((response) => response.json())
         .then((data) => {
           console.log('Success:', data.id);
           username = data.display_name;
           id = data.id
         })

         await setDoc(doc(db, "users", id), {
           name: username,
           private: false,
           token: req.query.token
         })
         res.status(200).send(username)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/songs', async (req, res, next) => {
    try{
        const url = 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=5'
        const data = await fetch(url, {headers: {
            'Authorization': 'Bearer ' + req.query.token
        }}).catch(err=> console.log(err))
            .then(res=> res.json())
            .then(data => data)
        console.log("i am in the songs api")
        res.status(200).send(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/artists', async (req, res, next) => {
    try{
        const url = 'https://api.spotify.com/v1/me/top/artists?offset=0&limit=5'
        const data = await fetch(url, {headers: {
            'Authorization': 'Bearer ' + req.query.token
        }}).catch(err=> console.log(err))
            .then(res=> res.json())
            .then(data => data)

        res.status(200).send(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router;


