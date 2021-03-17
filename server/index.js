const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');
//var passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/testAPI', routes.testAPI)

app.post('/verifyLogin', routes.verifyLogin)

app.post('/verifyRegister', routes.verifyRegister)