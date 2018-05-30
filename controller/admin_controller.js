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

    if(!username){
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
                res.send(err)
            }
        })
        db.query('SELECT * FROM user WHERE userID = ?',[userID], function(error,rows,fields){
            console.log(rows)
        })

}

//Delete user by ID, only deletes if username/password/id match
function deleteUser(req,res){
    console.log('deleteUser function called')

    var userID = req.body.userID || ''
    var username = req.body.username || ''
    var password = req.body.password || ''
    
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
                res.send(err)
            }
                res.send('Succesfully deleted user with ID: '+ userID)
            
        })
        } else {
            console.log('One or more credentials are incorrect, user cannot be deleted')
        }
    })
    // db.query('SELECT * FROM user WHERE userID = ?', [userID], function(error,rows,fields){
    //     console.log(rows)
    //     // should return empty
    // })
}

module.exports = {
    editUser,
    deleteUser
}