var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var auth = require('./auth')
var dotenv = require('dotenv').config()
const db = require("./firebase")

const {getDocs, setDoc, doc, collection, deleteDoc, updateDoc, getDoc} = require("firebase/firestore")

router.get('/', async (req, res, next) => {
    try{
        var username = ""
        var userDictionary = {}
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
           userDictionary['username'] = data.display_name;
           userDictionary['id'] = data.id
           username = data.display_name;
           id = data.id
         })

         let yourBio = "";
         let listOfUsers = [];
         const docs = await getDocs(collection(db, "users"))
         docs.forEach((doc) => listOfUsers.push(doc.data()))

         for (let i = 0; i < listOfUsers.length; i++) {
           if((listOfUsers[i].name === username)){
             yourBio = listOfUsers[i].bio;
           }
         }

         let yourPrivacy = false;
         const docs123 = await getDocs(collection(db, "users"))
         docs123.forEach((doc) => listOfUsers.push(doc.data()))

         for (let i = 0; i < listOfUsers.length; i++) {
           if((listOfUsers[i].name === username)){
             yourPrivacy = listOfUsers[i].private;
           }
         }

         await setDoc(doc(db, "users", id), {
           name: username,
           private: yourPrivacy,
           token: req.query.token,
           bio: yourBio
         })
         res.status(200).send(userDictionary)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.post('/getinbox', async (req, res, next) => {
    try{
        console.log("This api is accessed")
        let username = "";
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
           console.log(data);
           username = data.display_name;
         })

        let allMessages = [];
        let yourMessages = [];
        const docs = await getDocs(collection(db, "textmessages"))
        docs.forEach((doc) => allMessages.push(doc.data()))

        for (let i = 0; i < allMessages.length; i++) {
          console.log(username)
          if((allMessages[i].sender === username) || (allMessages[i].recipient === username)){
            yourMessages.push(allMessages[i])
          }
        }

        res.status(200).send(yourMessages)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


router.post('/sendmessage', async (req, res, next) => {
    try{
        console.log(req.body.time);
        await setDoc(doc(db, "textmessages", String(req.body.time)), {
          sender: req.body.sender,
          recipient: req.body.recipient,
          title: req.body.title,
          message: req.body.body,
          time: req.body.time
        })
        res.status(200).send("API for sending messages works")
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})



router.get('/getusername', async (req, res, next) => {
    try{
        console.log("this API works")
        var username = {}
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
           console.log('Success:', data.display_name);
           username["username"] = data.display_name;
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
