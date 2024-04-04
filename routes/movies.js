const express = require('express');
const router = express.Router();

router.get("/",async (req,
                      res)=>{
    console.log("query", req.query);
    res.render("movies")
})

router.post('/',(req,
                 res)=>{
    console.log("body: ", req.body);
    res.redirect('movies')
})

module.exports = router;