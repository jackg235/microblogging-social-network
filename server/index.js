const bodyParser = require('body-parser');
const express = require('express');
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
const chatRoutes = require("./routes/chat")
const cors = require('cors');
//var passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// ---------- auth routes ---------- //
app.get('/testAPI', authRoutes.testAPI)

app.post('/verifyLogin', authRoutes.verifyLogin)

app.post('/verifyRegister', authRoutes.verifyRegister)

// ---------- post routes ---------- //

app.post('/posts/new', postRoutes.new)

app.delete('/posts/delete', postRoutes.delete)

app.get('/posts/get', postRoutes.get)

app.get('/posts/getAll', postRoutes.getAll)

app.post('/posts/addComment', postRoutes.addComment)

app.delete('/posts/deleteComment', postRoutes.deleteComment)

app.post('/posts/like', postRoutes.like)

app.post('/posts/unlike', postRoutes.unlike)

// ---------- chat routes ---------- //

app.get('/chat/token', chatRoutes.getToken)

app.post('/chat/token', chatRoutes.postToken)

app.get('/video/token', chatRoutes.getVideoToken)

app.post('/video/token', chatRoutes.postVideoToken)

app.get('/voice/token', chatRoutes.getVoiceToken)

app.post('/voice/token', chatRoutes.postVoiceToken)

module.exports = app;