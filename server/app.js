const bodyParser = require('body-parser');
const express = require('express');
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const chatRoutes = require("./routes/chat.js")
const streamRoutes = require("./routes/stream")
const cors = require('cors');
const db = require('./data_layer/MongoAccessor')
const app = express();
const path = require('path');
const multer = require('multer');

db._connect('whiteboarders')

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use('/uploads', express.static('uploads'))
app.use(express.static(__dirname));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Root endpoint
app.use(express.static(path.join(__dirname, '../client/build')));

// ---------- auth routes ---------- //
app.get('/testAPI', authRoutes.testAPI)

app.post('/verifyLogin', authRoutes.verifyLogin)

app.post('/verifyRegister', authRoutes.verifyRegister)

app.delete('/users/delete/:username', authRoutes.deleteAccount)

app.post('/changePassword', authRoutes.changePassword)

app.post('/changeProfilePicture', upload.single('file'), authRoutes.changeProfilePhoto)

// ---------- user routes ---------- //

app.get('/users/:username', userRoutes.getAccount)

app.post('/users/follow', userRoutes.follow)

app.post('/users/block', userRoutes.block)

app.get('/users/blockers/:username', userRoutes.getBlockers)

// returns both blocking and blockedBy
app.get('/users/blocking/:username', userRoutes.getBlockingUsers)

app.get('/users/contacts/:username', userRoutes.getUserContacts)

app.get('/users/suggested/:username', userRoutes.getSuggestedUsers)

app.get('/getAllUsers', userRoutes.getAllUsernames)

// ---------- post routes ---------- //

app.post('/posts/new', upload.single('file'), postRoutes.new)

app.delete('/posts/delete', postRoutes.delete)

app.get('/posts/get/:postId', postRoutes.get)

app.get('/posts/getPosts/:username', postRoutes.getPosts)

app.get('/posts/getUserPosts/:username&:profileUser', postRoutes.getUserPosts)

app.post('/posts/addComment', postRoutes.addComment)

app.delete('/posts/deleteComment', postRoutes.deleteComment)

app.post('/posts/hide', postRoutes.hidePost)

// ---------- chat routes ---------- //

app.get('/chat/token', chatRoutes.getToken)

app.post('/chat/token', chatRoutes.postToken)

app.get('/video/token', chatRoutes.getVideoToken)

app.post('/video/token', chatRoutes.postVideoToken)

app.get('/voice/token', chatRoutes.getVoiceToken)

app.post('/voice/token', chatRoutes.postVoiceToken)

app.get('/universal/token', chatRoutes.getUniversalToken)

app.post('/universal/token', chatRoutes.postUniversalToken)

// ---------- stream routes ---------- //

app.put('/streams/start', streamRoutes.startStream)

app.delete('/streams/end', streamRoutes.endStream)

app.get('/streams/getAll', streamRoutes.getStreams)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;