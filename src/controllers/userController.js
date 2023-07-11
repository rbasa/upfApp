const Users = require('../models/Users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const controller = {
  login: (req, res) => {
    const api = req.params.api || false;
    if (!api) {
      return res.render('users/login');
    }
    return res.render('users/login');
  },
  redirectUser: (req, res) => {
    const api = req.params.api || false;
    if (req.cookies && req.cookies.token) {
      const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY_JWT);
      switch (decodedToken.userCategory) {
        case 'validator':
          if (!api) {
            return res.redirect('/validator/home');
          }
          return res.redirect('/validator/home/api');
        case 'enterprise':
          if (!api) {
            return res.redirect('/enterprise/home');
          }
          return res.redirect('/enterprise/home/api');
        case 'unplastify':
          if (!api) {
            return res.redirect('/unplastify/home');
          }
          return res.redirect('/unplastify/home/api');
        default:
          if (!api) {
            return res.redirect('/users/login');
          }
          return res.redirect('/users/login/api');

      }
    }
    if (!api) {
      return res.redirect('/users/login');
    }
    return res.redirect('/users/login/api');

  },
  loginProcess: async (req, res) => {
    const api = req.params.api || false;
    let userToLogin = await Users.createLoginToken(req.body.email);
    const user = userToLogin[0];
    if (!user) {
      console.log(userToLogin)
      if (!api) {
        return res.render('users/login', {
          errors: {
            login: {
              msg: 'Las credenciales son inválidas'
            }
          }
        });
      }
      return res.json(msg = 'Las credenciales son inválidas');
    }
    let passwordVerificated = bcryptjs.compareSync(
      String(req.body.password),
      user.password
    );
    if (!passwordVerificated) {
      if (!api) {
        return res.render('users/login', {
          errors: {
            login: {
              msg: 'Las credenciales son inválidas'
            }
          }
        });
      }
      return res.status(204).json({ message: 'Las credenciales son inválidas' });
    }
    // Generate JWT token, user completed properly its authentication
    const auth = {
      userId: user.user_id,
      email: user.email,
      address: user.address,
      userCategory: user.user_category,
      registered: user.registered
    }
    const token = jwt.sign(
      auth,
      process.env.SECRET_KEY_JWT
    );
    // Set the token as a cookie in the response
    res.cookie('token', token, 'user', auth, { httpOnly: true });
    // Redirect the user after successful login
    if (!api) {
      return res.redirect(`/${user.user_category}/home`);
    }
    return res.status(200).json({ message: 'Login successful', token, userCategory: user.user_category });
  },
  logout: (req, res) => {
    const api = req.params.api || false;
    // Clear the token cookie
    res.clearCookie('token');
    // Redirect the user to the desired page
    if (!api) {
      return res.redirect('/');
    }
    return res.redirect('/api');
  },
  register: async (req, res) => {
    const api = req.params.api || false;
    const userCategory = await Users.listCategory();
    if (!api) {
      return res.render('users/register', { userCategory });
    }
    return res.json([userCategory]);

  },
  processRegister: async (req, res) => {
    const api = req.params.api || false;
    userInDB = await Users.findByEmail(req.body.email);
    if (userInDB) {
      const userCategory = await Users.listCategory();
      if (!api) {
        return res.render('users/register', {
          userCategory,
          errors: {
            email: {
              msg: 'Este email ya está registrado'
            }
          },
          old: req.body
        })
      }
      return res.status(204).json({ message: 'Fail to register, email already registered' });
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    Users.create(req.body);
    if (!api) {
      return res.redirect('/users/login');
    }
    return res.status(200).json({ message: 'Data received successfully, User created' });
  },
  captureAuth: (req) => {
    const api = req.params.api || false;
    // Extract the token from the cookies
    const token = req.cookies.token;
    // Verify and decode the token
    return jwt.verify(token, process.env.SECRET_KEY_JWT);
  }
};
module.exports = controller;
