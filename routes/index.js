const express = require('express')
const router = express.Router();


router.get('/',(req, res) => {
    //check if you are logged in
    if(req.user)
    {
        //render main page
        res.render('index.ejs')
    }
    else
    {
        //redirect to sign in
        res.redirect('/signin')
    }

})

module.exports = router