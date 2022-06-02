var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var auth = require('./auth')
var dotenv = require('dotenv').config()
var axios = require('axios');
const db = require("./firebase")

const {getDocs, setDoc, doc, collection, deleteDoc, updateDoc} = require("firebase/firestore")

router.get('/', async (req, res, next) => {
    try{
        var username = ""
        var id = ""
        const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=5'
        const data = await fetch(url, {headers: {
            'Authorization': 'Bearer ' + req.query.token
        }}).catch(err=> console.log(err))
            .then(res=> res.json())
            .then(data => data)

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

        res.status(200).send(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


module.exports = router;
