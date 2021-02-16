require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const database = require('./includes/database');


//define routes
const signin = require('./routes/signin')
const signup = require('./routes/signup')
const index = require('./routes/index')
const logout = require('./routes/logout');
const { data } = require('jquery');

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next)
{
    if(!req.cookies.token)
    {
        req.user = null
        next()
        return
    }
    jwt.verify(req.cookies.token, process.env.AUTHORIZATION_TOKEN, (err, user) =>{
        if(err){
            req.user = null
            next()
            return
        }
        req.user = user
        next()
        return
    })
})

io.on('connection', (socket) => {

    socket.on("ready", (uuid) => {
        var sql = "INSERT INTO clients (uuid, socketid) VALUES ('"+uuid+"', '"+socket.id+"')";
        database.connection.query(sql);
    });

    socket.on("call", (id, peerid) => {
        var sql = "SELECT * FROM clients WHERE uuid='"+id+"'";
        database.connection.query(sql, (err, r0) => {
            if(err) throw err;

            var sql = "SELECT * FROM clients WHERE socketid='"+socket.id+"'";
            database.connection.query(sql, (err, r1) => {
                if(err) throw err;
                
                var callersId = r1[0].uuid;

                r0.forEach(element => {
                    io.to(element.socketid).emit("call", callersId, peerid);
                });
            });
        });
    });

    socket.on('disconnecting', () => {
        var sql = "DELETE FROM clients WHERE socketid = '"+socket.id+"'"
        database.connection.query(sql);
      });
});

app.use('/signin', signin);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/', index);
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

server.listen(3000);