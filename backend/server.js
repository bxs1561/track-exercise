const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


//app config
const app = express();
const port = process.env.PORT || 9000;


//middlewares
app.use(cors());
app.use(express.json());

//Database
const connection_url = process.env.DB_URL;
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("db connected")
})
//use routes

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//listen
app.listen(port,()=>console.log(`connecting to: ${port}`));
