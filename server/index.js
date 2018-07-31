const fs = require('fs');
const path = require('path');
const express = require('express');
const faker = require('faker');
const app = express();
const port = 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/', (request, response) => {
    response.send('Hello from Express!');

    // throw new Error('oops');
})

app.get('/api/table/:id', function(req, res) {
    const tableName = req.params.id;
    const dir = __dirname + '/db/' + tableName + '.json';

    if (fs.existsSync(dir)) {
        fs.readFile(dir, 'utf8', function (err, data) {
            if (err) throw err;

            const table = JSON.parse(data);

            res.status(200).send(table);
        });
    } else {
        throw new Error('Table not found');
    }
});

app.get('/api/tables', function(req, res) {
    const dir = __dirname + '/db/';

    fs.readdir(dir, (err, files) => {
        const tables = files.map(function(file) {
            return file.replace(/\.[^/.]+$/, "");
        });

        console.log(tables, 'TABLES request');

        if (!tables.length) {
            throw new Error('DB is empty');
        }

        res.status(200).send(tables);
    })
});

app.use((err, request, response, next) => {
    console.log(err, "ERROR in use callback")
    response.status(404).send('Table not found!');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});