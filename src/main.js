const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require("body-parser");

// RDSとの接続設定
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB
});

// ejsの定義
app.set("views","./src/views")
app.set("view engine", "ejs");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("start");
});

app.post("/get_address", (req, res) =>{
    const sql="select * from dis_address where BUSHO =\"" + req.body.msg + "\";"
    connection.query(sql, (error, result, fields) => {
      console.log(sql);
      console.log(result);
      res.render("address", {zip:result})
   })
})

app.listen(3000);
