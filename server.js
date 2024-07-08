const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/' , (req, res) => {
   return res.json("Server is running...");
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ToDoList_React'
});

app.get('/todo/getall', (req, res) => {
    const sql = 'SELECT * FROM item';
    db.query(sql, (err, data) => {
        if(err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post('/todo/add', (req, res) => {
    const { text } = req.body;
    const { category } = req.body;
    const { isCompleted } = req.body;
    const sql = `INSERT INTO item (text, category, isCompleted) VALUES ('${text}', '${category}', '${isCompleted}')`;
    db.query(sql, (err, data) => {
        if(err) {
            return res.json(err);
        }
        return res.json(data);
    });
}); 

app.put('/todo/completed/:id', (req, res) => {
    sql =`SELECT * FROM item WHERE id = ${req.params.id}`;
    db.query(sql, (err, data) => {
        if(err) {
            return res.json(err);
        }
        const isCompleted = data[0].isCompleted === 0 ? 1 : 0;
        const sql = `UPDATE item SET isCompleted = ${isCompleted} WHERE id = ${req.params.id}`;
        db.query(sql, (err, data) => {
            if(err) {
                return res.json(err);
            }
            return res.json(data);
        });
    });
});

app.delete('/todo/delete/:id', (req, res) => {
    const sql = `DELETE FROM item WHERE id = ${req.params.id}`;
    db.query(sql, (err, data) => {
        if(err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.listen(8000, () => {
   console.log("Server is running on port 8000");
});