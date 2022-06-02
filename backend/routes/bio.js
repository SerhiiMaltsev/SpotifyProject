var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var auth = require('./auth')
var dotenv = require('dotenv').config()
const db = require("./firebase")

const {getDocs, setDoc, doc, collection, deleteDoc, updateDoc} = require("firebase/firestore")

router.post('/', async (req, res, next) => {
    try{
        console.log("this api works")
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
module.exports = router;