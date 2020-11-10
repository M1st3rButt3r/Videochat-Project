var express = require('express')
var router = express.Router();
var database = require('../../includes/database')

router.get('/', (req, res) => {
    var sql = 'SELECT * FROM blocks WHERE uuida="'+req.user.id+'"'
    database.connection.query(sql, (err, result) => {
        if (err) throw err

        var jsonarray = []

        for (let i = 0; i < result.length; i++) {
            jsonarray[i] = result[i].uuidb
            
        }

        var json = JSON.parse(JSON.stringify(jsonarray))

        res.header('Access-Control-Allow-Origin', "http://localhost:3000").header('Access-Control-Allow-Credentials', true).status(200).json(json)
    })
})

module.exports = router