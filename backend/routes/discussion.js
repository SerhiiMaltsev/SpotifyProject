const express = require("express")
const router = express.Router()
const db = require("./firebase")

const {getDocs, collection, addDoc} = require("firebase/firestore")

router.get("/messages", async (req, res, next) => {
  const messages = []
  const docs = await getDocs(collection(db, "discussion"))
  docs.forEach((message) => messages.push({id: message.id,...message.data()}))
  res.json({result: messages})
})

router.post("/post", async (req, res, next) => {
  await addDoc(collection(db,"discussion"),req.body)
  res.send("posted")
})



module.exports = router