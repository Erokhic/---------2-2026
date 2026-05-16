import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connection } from './DB/db.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())



app.get("/users", function(req, res){

connection.query("SELECT * FROM user", function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})
 
app.get("/user/:id", function(req, res){
const userId = req.params.id
connection.query("SELECT id, login, id_role FROM user WHERE id =?", [userId], function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})

app.post("/reg", function(req, res){
const defaultRoleId = 1
const user = [defaultRoleId, req.body.login, req.body.password, req.body.full_name, req.body.phone, req.body.email]
const sql = "INSERT INTO user(id_role, login, password,full_name, phone, email) VALUES(?, ? ,?,?,?,?)"
connection.query(sql,user, function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})

app.post("/auth", function(req, res){
const user = [req.body.login, req.body.password]
connection.query("SELECT * FROM user WHERE login = ? AND password = ?", user, function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})



app.get("/payment_method", function(req, res){

connection.query("SELECT id, name FROM payment_method", function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})


app.post("/addNewRequest", function(req, res){
    const id_status = 1
const formData = [req.body.id_user, id_status,req.body.id_payment_method,req.body.course_name, req.body.start_date]
connection.query("INSERT INTO request (id_user, id_status, id_payment_method, course_name, start_date)VALUES(?,?,?,?,?)", formData, function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})

 
// app.get("/requests/:userId", function(req, res){

// connection.query("SELECT * FROM request WHERE id_user=?", function(err, results) {
//     if(err) console.log(err);
//     else console.log(results) 
//     res.json(results);
// });

// })


 
app.get("/coursesNames/:id", function(req, res){
const userId =parseInt(req.params.id) 
const sql = "SELECT id, course_name FROM request WHERE id_user=?"
connection.query(sql,[userId] ,function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})

app.post("/addNewComment", function(req, res){
const  created_at= new Date()
const formData = [req.body.id_user,req.body.id_request,req.body.text_comment,created_at]
connection.query("INSERT INTO comment (id_user, id_request, text_comment, created_at)VALUES(?,?,?,?)", formData, function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});
})


app.get("/allRequestions", function(req, res){
const sql = `
        SELECT  
            u.full_name, 
            p.name as payment_name, 
            r.course_name, 
            r.start_date, 
            s.name as status_name 
        FROM request r
        JOIN user u ON u.id = r.id_user
        JOIN status s ON s.id = r.id_status
        JOIN payment_method p ON p.id = r.id_payment_method
        ORDER BY r.start_date DESC
    `
connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})





















app.listen(3000, function(){
  console.log("Сервер подключился");
});