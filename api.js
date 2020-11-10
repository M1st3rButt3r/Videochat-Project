require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const database = require('./includes/database')

const user = require("./routes/api/user")
const friends = require("./routes/api/friends")
const blocks = require("./routes/api/blocks")
const requests = require('./routes/api/requests')
const requested = require('./routes/api/requested')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    if(!req.cookies.token)
    {
        console.log(req.cookies.token)
        res.sendStatus(401)
        return
    }
    jwt.verify(req.cookies.token, process.env.AUTHORIZATION_TOKEN, (err, user) =>{
        if(err){
            res.sendStatus(401)
            return
        }
        req.user = user
    })

    next()
})

app.use(function(req, res, next) {
    var sql = 'SELECT name, tag FROM user WHERE uuid="'+req.user.id+'"'
    database.connection.query(sql, (err, result) => {
        if(err) throw err

        if(!result[0])
        {
            res.sendStatus(404)
            return
        }
        req.user.name = result[0].name
        req.user.tag = result[0].tag
            
        next()
    })
})

app.use("/user", user)
app.use("/friends", friends)
app.use("/blocks", blocks)
app.use('/requests', requests)
app.use('/requested', requested)


app.listen(3001)