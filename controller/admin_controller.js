const db = require('../database/database')
const auth = require('../authentication/authentication')

//Edits user by ID, fill any other value with new value to update
//If some values need to go unchanged, enter the old values
function editUser(req,res){
    console.log('editUser function called')

    var userID = req.body.userID || ''
    var username = req.body.username || ''
    var password = req.body.password || ''
    var imei = req.body.imei || ''

    if(!username || !password || !imei){
        res.json({
            "message": "No parameters"
        })
        return
    }


    db.query('SELECT * FROM user WHERE userID = ?',[userID], function(error,rows,fields){
        console.log(rows)
    })

        var query ={
            sql: 'UPDATE user SET username = ?, password = ?, imei = ? WHERE userID = ?',
            values: [username, password, imei, userID],
            timeout : 3000
        }
        db.query(query,(err,response,fields)=>{
            if(err){
                console.log('error occured in editUser query')
                res.json({
                    error: err
                })
            }
        })
        db.query('SELECT * FROM user WHERE userID = ?',[userID], function(error,rows,fields){
            console.log(rows)
            res.json({
                "message": "edit succesful"
            })
        })

}

//Delete user by ID, only deletes if username/password/id match
function deleteUser(req,res){
    console.log('deleteUser function called')

    var userID = req.body.userID || ''
    var username = req.body.username || ''
    var password = req.body.password || ''

    if(!userID || userID == ''|| !username || username == '' || !password || password ==''){
        res.status(412).json({
            "message": "Please make sure all fields are filled in",
            "status":"412"
        })
        return
    }
    
    db.query('SELECT * FROM user WHERE userID = ?', [userID], function (error, rows, fields) {

        // Handle Mysql Errors
        if (error) {
            res.status(500).json(error)
        }

        console.log(rows)

        if (username == rows[0].username && password == rows[0].password) {
            console.log('Credentials matched')
            var query = {
                sql: 'DELETE FROM user WHERE userID = ?',
                values : userID,
                timeout : 3000
            }
        db.query(query,(err,response,fields)=>{
            if(err){
                res.json({
                    "error": err
                })
            }res.json({
                "message": "Succesfully deleted user"
            })
            
        })
        } else {
            console.log('One or more credentials are incorrect, user cannot be deleted')
            res.json({
                "error:": "One or more credentials are incorrect, user cannot be deleted"
            })
        }
    })
   
}

function editDriver(req,res){
    console.log('editDriver function called')

    var userID = req.body.userID || ''
    var firstname = req.body.firstname || ''
    var lastname = req.body.lastname || ''

    if(userID==="" || firstname==="" || lastname===""){
        res.json({
            "message": "No parameters"
        })
        return
    }


    db.query('SELECT * FROM driver WHERE userID = ?',[userID], function(error,rows,fields){
        if(!rows[0]){
            res.json({
                "Message": "No user found with this ID"
            })
        } else{
            console.log(rows)
            var query ={
                sql: 'UPDATE driver SET firstname = ?, lastname = ? WHERE userID = ?',
                values: [firstname, lastname, userID],
                timeout : 3000
            }
            db.query(query,(err,response,fields)=>{
                if(err){
                    console.log('error occured in editDriver query')
                    res.json({
                        error: err
                    })
                }
            })
            db.query('SELECT * FROM driver WHERE userID = ?',[userID], function(error,rows,fields){
                console.log(rows)
            })
            res.json({
                status: 200
            })
        }  
    })

       
}

function editImei(req,res){
    console.log('editImei function called')

    var userID = req.body.userID || ``
    var imei = req.body.imei || ``

    if(!userID || !imei){
        res.json({
            "message" : "Missing parameters, check if userID or imei is missing"
        })
    }

    db.query('SELECT * FROM user WHERE userID = ?', [userID], function(error,rows,fields){
        console.log(rows)
    })

    var query ={
        sql: 'UPDATE user SET imei = ? WHERE userID = ?',
        values: [imei, userID],
        timeout : 3000
    }
    db.query(query,(err,response,fields)=>{
        if(err){
            console.log('error occured in editImei query')
            res.json({
                error : err
            })
        }
        console.log('editImei succesfull')
    })
    db.query('SELECT * FROM user WHERE userID = ?',[userID], function(error,rows,fields){
        console.log(rows)
    })
    res.json({
        status: 200
    })
}

module.exports = {
    editUser,
    deleteUser,
    editDriver,
    editImei
}