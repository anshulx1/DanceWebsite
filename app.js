const express = require('express');
const { dirname } = require('path');
const path = require("path");
const fs = require('fs');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/contactDance');

const port = 80;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


const app = express();

app.use('/static', express.static('static'));

app.use(express.urlencoded());

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const param = {}
    res.status(200).render('home.pug', param);
})

app.get('/contact', (req, res) => {
    const param = {}
    res.status(200).render('contact.pug', param);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the database");
    });
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})