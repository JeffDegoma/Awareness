require('dotenv').config()
const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const morgan = require('morgan')
const flash  = require('connect-flash');


const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const configDB = require('./config/database.js')
require('./config/passport')(passport)


mongoose.Promise = global.Promise
mongoose.connect(configDB.url)

app.set('view engine', 'ejs')


app.use(cookieParser())// reads cookies(needed for auth)
app.use(morgan('common'))


//password
app.use(session({secret: 'ilovescotchscotchyschotch', resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()); // use connect-flash for flash messages stored in session


app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

require('./app/routes.js')(app,passport)

app.listen(PORT, ()=> console.log(`Server is listening on ${PORT}`))

