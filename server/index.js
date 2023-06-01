const expres = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require("./routes/messageRoutes");

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected to DB'))
    .catch(err => console.log(err));

const app = expres();
app.use(cors());
app.use(expres.json());

const sever = app.listen(process.env.PORT, () => {
    console.log('server started at port ', process.env.PORT);
});


app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);