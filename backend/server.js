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

 
app.get("/requests/:userId", function(req, res){

connection.query("SELECT * FROM request WHERE id_user=?", function(err, results) {
    if(err) console.log(err);
    else console.log(results) 
    res.json(results);
});

})



























app.listen(3000, function(){
  console.log("Сервер подключился");
});