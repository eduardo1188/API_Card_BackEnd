const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash =require('connect-flash')
const dotenv = require('dotenv')

const path = require('path');

const tasksRoutes = require('./routes/tasksRouter');
const userRoutes = require('./routes/userRouter');

dotenv.config();
const app = express();

// connect db
require('./database/dbConfig');

// view engine configuration
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');



// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_WORD,
  cookie: { maxAge: 1000 * 60 }
}))
app.use(flash());

//Variables globales
app.use((req, res, next)=>{
  res.locals.user =req.session.userId ;
  res.locals.success = req.flash('success');
  res.locals.unSuccess = req.flash('worng');
  next();
})



// routes
app.use(tasksRoutes);
app.use(userRoutes);


const PORT = process.env.PORT || 3000;
// server
app.listen(3000, () => console.log(`running on port ${PORT}`))