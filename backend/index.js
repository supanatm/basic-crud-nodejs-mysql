import express, { urlencoded } from "express";
import mysql from "mysql2";
import cors from "cors";
import 'dotenv/config'


const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// database create connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})

// default path
app.get("/", (req, res) => {
    res.send("Hello this is backend");
})

// get all books
app.get("/books", (req, res) => {
    try {
        const sql = "SELECT * FROM " + process.env.DB_TABLE;
        db.query(sql, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    } catch (err) {
        console.error(err);
    }
})

// get by id
app.get("/book/:id", (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM " + process.env.DB_TABLE + " WHERE id = ?";
        db.query(sql, [id], (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    } catch (err) {
        console.error(err);
    }
})

// create new book
app.post("/createbook", (req, res) => {
    try {
        const sql = "INSERT INTO " + process.env.DB_TABLE + "(`title`, `describe`, `price`, `cover`) VALUES (?)";
        const values = [
            req.body.title, 
            req.body.describe,
            req.body.price, 
            req.body.cover
        ];
        
        db.query(sql, [values], (err, data) => {
            // console.log([values]);
            if (err) return res.send(err);
            return res.send("book has been created");
        })
    } catch (err) {
        console.error(err);
    }
})

// update book
app.patch("/editbook/:id", (req, res) => {
    try {
        const { id } = req.params;
        const sql = "UPDATE " + process.env.DB_TABLE + " SET `title` = ?, `describe` = ?, `price` = ?, `cover` = ? WHERE id = ?";
        const values = [
            req.body.title, 
            req.body.describe, 
            req.body.price, 
            req.body.cover,
            id
        ];
        db.query(sql, [...values], (err, data) => {
            // console.log(values);
            if (err) return res.send(err);
            return res.send("book has been updated");
        })
    } catch (err) {
        console.error(err);
    }
})

// delete book
app.delete('/deletebook/:id', (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM " + process.env.DB_TABLE + " WHERE id = ?";
        db.query(sql, [id], (err, data) => {
            // console.log(id);
            if (err) return res.send(err);
            return res.send("book has been deleted");
        })
    } catch (err) {
        console.error(err);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})