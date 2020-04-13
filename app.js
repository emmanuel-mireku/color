const express = require('express');



const indexPage = require('./routes/index');

const app = express();

app.set('view engine', 'pug');
app.set('view');

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));



// route for page
app.use('/', indexPage);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server is running on ${PORT}`));

