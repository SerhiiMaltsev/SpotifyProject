var express = require('express');
var router = express.Router();

const { getDocs, collection } = require('firebase/firestore');
const db = require('./firebase.js');

const users = [];

getDocs(collection(db, "users")).then((allDocs) => {
    allDocs.forEach((user) => users.push(user.data()))
})

router.get('/', async (req, res, next) => {
    try {
        res.status(200).send(users)
    }
    catch(err){
        console.log("error happened")
        console.log(err)
    }
})

module.exports = router


