var express = require('express');
var router = express.Router();

const { getDocs, collection } = require('firebase/firestore');
const db = require('./firebase.js');

const discussions = [];

getDocs(collection(db, "discussions")).then((allDocs) => {
    allDocs.forEach((disc) => discussions.push(disc.data()))
})

router.get('/', async (req, res, next) => {
    try {
        res.status(200).send(discussions)
    }
    catch(err){
        console.log("error happened")
        console.log(err)
    }
})

module.exports = router
