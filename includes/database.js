const mysql = require('mysql')

//setup connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat"
})

//check for errors
connection.connect(function(err) {
    if(err) throw err
    else console.log("Connected")
})

module.exports = {connection}