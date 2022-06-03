var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var auth = require('./auth')
var dotenv = require('dotenv').config()
const db = require("./firebase")

const {getDocs, setDoc, doc, collection, deleteDoc, updateDoc, getDoc} = require("firebase/firestore")

router.post('/', async (req, res, next) => {
    try{
         await updateDoc(doc(db, "users", String(req.body.id)),{
            bio: req.body.bio
        }
        );
         res.send(req.body);
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }


})
router.get('/getbio', async (req, res, next) => {
    try{
      var username = ""
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
         username = data.display_name;
       })


        let yourBio = {};
        let listOfUsers = [];
        const docs = await getDocs(collection(db, "users"))
        docs.forEach((doc) => listOfUsers.push(doc.data()))
        for (let i = 0; i < listOfUsers.length; i++) {
          if(listOfUsers[i].name === username){
            console.log("YOUR BIO IS HERE ======>>>>>>" + listOfUsers[i].bio)
            yourBio["bio"] = listOfUsers[i].bio;
          }
        }

          res.send(yourBio)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/getprivacy', async (req, res, next) => {
    try{
      var username = ""
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
         username = data.display_name;
       })


        let yourPrivacy = {};
        let listOfUsers = [];
        const docs = await getDocs(collection(db, "users"))
        docs.forEach((doc) => listOfUsers.push(doc.data()))
        for (let i = 0; i < listOfUsers.length; i++) {
          if(listOfUsers[i].name === username){
            
            yourPrivacy["privacy"] = listOfUsers[i].private;
          }
        }
        res.send(yourPrivacy)

    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


router.post('/privacy', async (req, res, next) => {
    try{
         await updateDoc(doc(db, "users", String(req.body.id)),{
            private: req.body.private
        }
        );
         res.send(req.body);
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }


})
module.exports = router;
