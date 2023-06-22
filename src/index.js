const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');

const SortMiddleware = require('./app/middlewares/sortMiddleware');

const app = express();
const port = 8080;

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//custom middleware

app.use(SortMiddleware);

//HTTP loggrer
app.use(morgan('combined'));
//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init

route(app);

app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
});
