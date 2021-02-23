var express = require('express')
var router = express.Router();
var database = require('../../includes/database')

router.get('/', (req, res) => {
    //get all relations with the requested status and which are requested another user to me
    var sql = 'SELECT * FROM relations WHERE status="0" AND uuidb="'+req.user.id+'"'
    database.connection.query(sql, (err, result) => {
        if (err) throw err

        var jsonarray = []

        //write json array
        for (let i = 0; i < result.length; i++) {
            jsonarray.push(result[i].uuida)
        }
        //convert to json
        var json = JSON.parse(JSON.stringify(jsonarray))

        //respond
        res.header('Access-Control-Allow-Origin', "http://localhost:3000").header('Access-Control-Allow-Credentials', true).status(200).json(json)
    })
})

module.exports = router