const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./src/database/database');
const session = require('express-session');
const flash = require('connect-flash')

const hostname = 'localhost';
const port = 3000;

const CategoriesController = require('./src/controllers/categories/CategoriesController')
const ArticlesController = require('./src/controllers/articles/ArticlesController');

const Article = require('./src/models/articles/Article');
const Category = require('./src/models/categories/Category');

app.set('views', path.join(__dirname, 'src/views/'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src/public')))
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log('Server data base online!');
    }).catch((error) => {
        console.log(error);
    });


app.use('/', CategoriesController);
app.use('/', ArticlesController);

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});