const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const pool = require('./db');
const passport = require('passport');
const morgan = require('morgan');
const dotenv = require('dotenv');

// init
dotenv.config({ path: '/' });
const app = express();
require('./lib/passport');

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  hbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
  })
);
app.set('view engine', '.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: 'usersession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, pool),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');

  next();
});

// routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use('/links', require('./routes/links'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// server
app.listen(process.env.PORT, () =>
  console.log(`server on http://localhost:${process.env.PORT}`)
);
