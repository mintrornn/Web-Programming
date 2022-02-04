/* Import express, path, body-parser  */
const express = require("express");
const app = express();
const path = require("path");
const bp = require("body-parser");
const env =require("dotenv").config();
const mysql = require('mysql2');

const router = express.Router();
app.use("/", router); 

var cors = require('cors');
app.use(cors());

router.use(bp.json())
router.use(bp.urlencoded({ extended: true}))

/* Handle GET: Display myform.html */
/*router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));*/

/* Import modules here: express, dotenv, router */
/* Config dotenv and router */
/* Connection to MySQL */
var connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

router.get("/", cors(), function(req,res){
    console.log("Accessed Contact Us");
    res.sendFile(path.join(__dirname+'/log in.html'));
});

console.log(process.env.MYSQL_USERNAME); 

/* Connect to DB */
connection.connect(function(err){
    if(err) throw err;
    console.log("Connected DB: "+process.env.MYSQL_DATABASE);
});

//select all
router.get('/user', cors(), function (req, res) {
    connection.query('SELECT * FROM UserInfo', function (error, results) {
    if (error) throw error;
        return res.send({ error: false, data: results, message: 'User list.' });
    });
});

//select
router.get('/user/:id', cors(), function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user id.' });
    }
    connection.query('SELECT * FROM UserInfo where user_id', user_id, function (error, results) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'User retrieved' });
    });
});

//insert
router.post('/insert', function (req, res) {
    let user = req.body.user;
    console.log(user);
    if (!user) {
    return res.status(400).send({ error: true, message: 'Please provide user information' });
    }
    connection.query("INSERT INTO userinfo SET ?", user, function (error, results) {
    if (error) throw error;
    return res.send({error: false, data: results.affectedRows, message: 'New user has been created successfully.'});
    });
});

//update
router.put('/update', function (req, res) {
    console.log(req.body);
    let user = req.body.user;
    if (!user) {
    return res.status(400).send({ error: user, message: 'Please provide user information' });
    }
    connection.query("UPDATE userinfo SET ? WHERE user_id = ?", [user, user.user_id], function (error, results) {
    if (error) throw error;
    return res.send({error: false, data: results.affectedRows, message: 'Users has been updated successfully.'})
    });
});


//delete

router.delete('/delete', function (req, res) {
    let user_id = req.body.user;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
    }
    connection.query('DELETE FROM userinfo WHERE user_id = ?', [user_id], function (error, results){
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'User has been deleted successfully.' });
    });
})

//app.listen(process.env.PORT);
    
   // server listening
app.listen(process.env.PORT, function () {
    console.log("Server listening at Port " + process.env.PORT);
}); 