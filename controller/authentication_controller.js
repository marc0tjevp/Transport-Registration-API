const auth = require('../authentication/authentication')
const db = require('../database/database')

function login(req,res){

    console.log('login function called')
    //Undefined username/password, ff fixe
    var username = req.body.username
    var password = req.body.password

    db.query('SELECT username, password FROM user WHERE username = ?',[username], function(error,rows,fields){
        if(error){
            res.status(500).json(error)
        }

        console.log(rows)

        if(username == rows[0].username && password == rows[0].password){
            let token = auth.encodeToken(username)
            res.status(200).json({
                "message": token,
                "status" : 200,
                "parameters": res.body
            })
        } else {
            if(!rows[0]){
                res.send("No valid credentials")
            } else if(username == rows[0].username && password == rows[0].password){
                let token = auth.encodeToken(username)
                response.status(200).json({
                    "message": token,
                    "status": 200,
                    "parameters": res.body
                })
            }
        }
    })


}

function register(req,res){
    console.log('register function called')
    var username = req.body.username
    var password = req.body.password

    var query = {
        sql: 'INSERT INTO `user`(username, password) VALUES (?, ?)', // deze query gaat problemen krijgen ivm auto increment en missende waardes zoals IMEI
            values: [username, password],
            timeout: 3000
    }
    db.query('SELECT username FROM user WHERE username = ?',[username],function(error,result){
        if(result.length > 0){
            res.send('Email taken')
            return
        } else {
            if(username == '' || password == ''){
                res.send('Missing properties')
                return
            }

            db.query(query, function(error,rows,field){
                if(error){
                    res.status(500).json({
                        "message": error,
                        "status": 500,
                        "parameters": req.body
                    })
                } else {
                    res.status(200).json({
                        "message": "User has been registered",
                        "status": 200,
                        "parameters": req.body
                })
            }
        })
    }
    })
    console.log(username+ " and "+ password)
}

module.exports = {
    login,
    register
}