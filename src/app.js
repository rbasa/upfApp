const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cors());

const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const enterpriseRoutes = require('./routes/enterpriseRoutes');
const unplastifyRoutes = require('./routes/unplastifyRoutes');
const validatorRoutes = require('./routes/validatorRoutes');
const privateRoutes = require('./routes/privateRoutes');
const chatRoutes = require('./routes/chatRoutes');

const userLogged = require('./middlewares/userLogged');

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
//borrar session
app.use(session({
  secret: 'upf secret',
  resave: false,
  saveUninitialized: false
}));
app.use(cookies());
app.use(userLogged);
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
app.use(flash());
app.use(cookieParser());

app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/enterprise', enterpriseRoutes);
app.use('/unplastify', unplastifyRoutes);
app.use('/validator', validatorRoutes);
app.use('/private', privateRoutes);
app.use('/chat', chatRoutes);

app.get('*', (req, res) => {
  res.redirect('/');
});
