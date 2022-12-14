const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const session = require ('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const flash = require('connect-flash')
const dotenv = require('dotenv')
const cors = require('cors');
const moment = require('moment');
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db');


const app = express()
const PORT = process.env.PORT || 3050

// Environment variables
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

// Connecting the databse
connectDB()

// Middleware to use files and take care of errors
app.use(express.urlencoded( {extended: false} ))
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cors())
app.use(express.json())

// Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgon('dev'))
}
// Middlware to save data and cooke sessions
app.use(cookieParser('StudentDatabaseSecure'));
app.use(session({
    secret: "StudentDatabaseSecretSession",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI})
}));


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Middlware to send messages
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// Middleware to send flash messages and also upload files. 
app.use(flash());
app.use(fileUpload());

// Middleware for moment
app.use((req, res, next) =>{
    res.locals.moment = moment;
    next();
});

// use the layouts package and views for the files. 
app.set('layout', './layouts/main');
// app.set('layout', './layouts/login')
app.set('view engine','ejs' )

// Bring in the routes file so that it can be exported.
//const routes = require('./server/routes/studentDatabaseRoutes.js')
//const authroutes = require('./server/routes/auth.js')
app.use('/', require('./server/routes/index.js'))
//app.use('/', routes);
app.use('/auth', require('./server/routes/auth.js'));
app.use('/students', require('./server/routes/studentDatabaseRoutes.js'))

// Port to listen
app.listen(PORT, () => console.log(`Listening to port ${PORT}`))