const express = require('express')
const router = express.Router();

router.get('/',(req, res) => {
    if(req.user)
    {
        res.render('index.ejs')
    }
    else
    {
        res.redirect('/signin')
    }

})

module.exports = router