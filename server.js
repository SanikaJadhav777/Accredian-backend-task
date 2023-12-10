const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user_db"
})

app.get('/', (re, res) => {
    return res.json("From backend side");
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user_data";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO user_data (user_name, email, password) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err)
        {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user_data WHERE 'email' = ? AND 'password' = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err)
        {
            return res.json("Error");
        }
        if(data.length > 0)
        {
            return res.json("Success");
        }
        else
        {
            return res.json("Fail");
        }
    })
})

app.listen(5000, ()=>{
    console.log("listening");
})