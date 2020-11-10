const express = require('express')
const router = express.Router();

//logout
router.get('/', (req, res) => {
    res.cookie('token', '')
    res.redirect('/signin')
    return
})

module.exports = router