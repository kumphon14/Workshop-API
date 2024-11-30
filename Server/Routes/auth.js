const express = require('express')
const router = express.Router();

//
router.get('/auth',(req,res)=>{
    console.log("hello routes")
    res.send("Hello Routes")
})

module.exports = router