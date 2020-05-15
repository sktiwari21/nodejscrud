// client side
const https = require('https');
const mongoose = require('mongoose');
const express = require('express');
// const bp = require('body-parser');

// handles all http routes (post, get, ...)
const items = require('./routes/api/items')

const app = express();

// Body Parser Middleware (may not be used now)
app.use(express.json());

//get config with all hidden keys
const db = require('./config/keys').mongoURI;

// Connect to Mongo using the Mongoose ORM
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(e => console.log('MongoDB Err: ' + e));

// use routes 
app.use('/api/items', items)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`shits listening on port ${port}`));



// we could do all the routes here (app.get, app.post, app.delete... )
// instead we're doing it cleaner