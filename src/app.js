const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors');
app.use(cors())

// const userLogged = require('./middlewares/userLogged');
// const mainRoutes = require('./routes/mainRoutes');
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes');
// const apiRoutes = require('./routes/apiRoutes');

app.use(session({
  secret: 'es un secreo',
  resave: false,
  saveUninitialized: false
}));
app.use(cookies());
app.use(userLogged);
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.listen(PORT, ()=>{
  console.log(`Server running ar port ${PORT}`);
});

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', mainRoutes);
app.use('/api', apiRoutes);
