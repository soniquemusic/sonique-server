const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/auth.routes');
const authorRoutes = require('./routes/author.route');
const songRoutes = require('./routes/song.route');
const albumRoutes = require('./routes/albums.routes');

dotenv.config();
connectDB();

const corsOptions = {
    origin: ['http://localhost:5173', 'https://sonique-user.vercel.app', 'https://admin-panel-five-woad.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/sonique/user', userRoutes);
app.use('/sonique/author', authorRoutes);
app.use('/sonique/song', songRoutes);
app.use('/sonique/album', albumRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
