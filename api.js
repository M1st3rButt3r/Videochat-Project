require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const database = require('./includes/database')

//define routes
const user = require("./routes/api/user")
const friends = require("./routes/api/friends")
const blocks = require("./routes/api/blocks")
const requests = require('./routes/api/requests')
const requested = require('./routes/api/requested')
const block = require('./routes/api/block')
const unblock = require('./routes/api/unblock')
const deleteRelation = require('./routes/api/deleteRelation')
const request = require('./routes/api/request')

//app.use is for functions which are executed with an request, that can be multiple then they'll be executed in order.
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));

//Here we if we have set a cookie for the token
app.use(function(req, res, next) {
    if(!req.cookies.token)
    {
        res.header('Access-Control-Allow-Credentials', true).header('Access-Control-Allow-Origin', "http://localhost:3000").sendStatus(500)
        return
    }
    //Verification of the token
    jwt.verify(req.cookies.token, process.env.AUTHORIZATION_TOKEN, (err, user) =>{
        if(err){
            res.header('Access-Control-Allow-Origin', "http://localhost:3000").header('Access-Control-Allow-Credentials', true).sendStatus(401)
            return
        }
        req.user = user
    })

    next()
})

//check if the user exists and fetch data which is used in every request
app.use(function(req, res, next) {
    var sql = 'SELECT name, tag FROM user WHERE uuid="'+req.user.id+'"'
    database.connection.query(sql, (err, result) => {
        if(err) throw err
        
        if(!result[0])
        {
           
            res.header('Access-Control-Allow-Origin', "http://localhost:3000").header('Access-Control-Allow-Credentials', true).sendStatus(404)
            return
        }
        //Set data
        req.user.name = result[0].name
        req.user.tag = result[0].tag
            
        next()
    })
})

//This are just forwarding to other files
app.use('/requested', requested)
app.use('/block', block)
app.use('/unblock', unblock)
app.use('/deleteRelation', deleteRelation)
app.use('/request', request)

//listen on port 3001
app.listen(3001)
