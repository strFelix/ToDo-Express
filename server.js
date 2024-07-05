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
    const { titleItem } = req.body;
    const { categoryItem } = req.body;
    const { isCompletedItem } = req.body;
    const sql = `INSERT INTO item (titleItem, categoryItem, isCompletedItem) VALUES ('${titleItem}', '${categoryItem}', '${isCompletedItem}')`;
    db.query(sql, (err, data) => {
        if(err) {
            return res.json(err);
        }
        return res.json(data);
    });
}); 

app.post('/todo/completed/:id', (req, res) => {
    sql =`SELECT * FROM item WHERE idItem = ${req.params.id}`;
    db.query(sql, (err, data) => {
        if(err) {
            return res.json(err);
        }
        const isCompletedItem = data[0].isCompletedItem === 0 ? 1 : 0;
        const sql = `UPDATE item SET isCompletedItem = ${isCompletedItem} WHERE idItem = ${req.params.id}`;
        db.query(sql, (err, data) => {
            if(err) {
                return res.json(err);
            }
            return res.json(data);
        });
    });
});

app.get('/todo/delete/:id', (req, res) => {
    const sql = `DELETE FROM item WHERE idItem = ${req.params.id}`;
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