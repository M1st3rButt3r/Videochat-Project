var express = require('express')
var router = express.Router();
var database = require('../../includes/database')
var url = require('url');



router.get('/', (req, res) => {
    var uuid = url.parse(req.url, true).query.uuid;
    if(!uuid)
    {
        res.header('Access-Control-Allow-Origin', "http://localhost:3000").header('Access-Control-Allow-Credentials', true).status(200).json({
            name: req.user.name,
            tag: req.user.tag
        })
        return
    }
    else
        requestUserInfo(uuid, res)
})

function requestUserInfo(id, res) {
    var sql = 'SELECT name, tag FROM user WHERE uuid="'+id+'"'
    database.connection.query(sql, (err, result) => {
        if(err) throw err

        if(!result[0])
        {
            res.sendStatus(404)
            return
        }

        res.header('Access-Control-Allow-Origin', "http://localhost:3000").header('Access-Control-Allow-Credentials', true).status(200).json({
            name: result[0].name,
            tag: result[0].tag
        })
    })
}

module.exports = router