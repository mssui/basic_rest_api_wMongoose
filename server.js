const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

mongoose.Promise = global.Promise;
const port = process.env.PORT || 3030;
mongoose.connect('mongodb://localhost/aslitest');

var app = express();

app.use(cors());
app.use(bodyparser.json());

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
app.use('/', require('./routes/api'));

app.listen(port, ()=>{
    console.log('Server is running on:', port)
});
