var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = process.env.PORT || 5000;
const app = express();
const api = require('./server/routes');

mongoose.connect('mongodb://localhost/spacebookDB', function() {
console.log("DB connection established!!!");
})

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', api);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));







