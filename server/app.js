const bodyParser = require('body-parser');
const express = require('express');
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const chatRoutes = require("./routes/chat.js")
const cors = require('cors');
const db = require('./data_layer/MongoAccessor')
const app = express();

db._connect('whiteboarders') // set to 'whiteboarders' for deployment mode, 'test' for testing

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ---------- auth routes ---------- //
app.get('/testAPI', authRoutes.testAPI)

app.post('/verifyLogin', authRoutes.verifyLogin)

app.post('/verifyRegister', authRoutes.verifyRegister)

app.delete('/users/:username', authRoutes.deleteAccount)

// ---------- user routes ---------- //

app.get('/users/:username', userRoutes.getAccount)

app.post('/users/follow', userRoutes.follow)

// ---------- post routes ---------- //

app.post('/posts/new', postRoutes.new)

app.delete('/posts/delete', postRoutes.delete)

app.get('/posts/get', postRoutes.get)

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