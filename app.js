require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');

const userRouter = require('./routes/userRouter');
const booksRouter = require('./routes/bookRouter');

const app = express();

//analyser les corps des requêtes entrantes dans un intergiciel avant vos gestionnaires
app.use(bodyParser.json());
//configure le middleware bodyParser pour qu'il traite les données codées en url.
app.use(bodyParser.urlencoded({ extended: true }));


//Connect to the database
const dbURI = 'mongodb://127.0.0.1:27017/bookStore'
mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(()=> console.log('Connected to Database: '))
      .catch(err => console.log(err));

// Routes
app.use('/user', userRouter);
app.use('/books', booksRouter);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
