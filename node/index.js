const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(sqlTable);
const sql = `INSERT INTO people(name) values('Wesley')`;
connection.query(sql);


app.get('/', (req, res)=> {
	const sql = `SELECT * FROM people`;
    connection.query(sql, (err, result)=> {
        const newNames = result.map(item=> item.name);
        res.send(`<h1>Full Cycle Rocks!</h1>
            ${newNames.map(item=> {
                return '<p>' + item + '</p>'
            })}
        `)
    })

})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port);
})