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
        const docRef = doc(db, "users", String(req.body.id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("bio sent!")
            res.send(req.body.bio)
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
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