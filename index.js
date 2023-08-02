const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:3000',
}));

const port = process.env.PORT || 3001;

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "gabbarberbase"
})


app.post("/newClient", (req, res) => {
    const { name } = req.body;
    const { description } = req.body;

    let SQL = "INSERT INTO client (name, description) VALUES ( ?,? )";

    db.query(SQL, [name, description], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/getClients", (req, res) => {
    let SQL = "SELECT * FROM client";
    db.query(SQL, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.use(express.json());

app.listen(3001, () => console.log("rodando"));