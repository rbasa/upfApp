const Users = require('../models/Users');
const bcryptjs = require('bcryptjs');

const controller = {
  login:(req, res) => {
    return res.render('users/login');
  },
  redirectUser:(req,res)=>{
    if(req.session.userLogged){
      switch (req.session.userLogged.user_category_id) {
        case 1:
          return res.redirect('/validator/home');
        case 2:
          return res.redirect('/enterprise/home');
        case 3:
          return res.redirect('/unplastify/home');
        default:
          return res.redirect('/users/login');
      }
    }
    return res.redirect('/users/login');
  },
  loginProcess: async(req, res) => {
    let userToLogin = await Users.findByEmail(req.body.email);
    if (!userToLogin) {
      return res.render('users/login', {
        errors: {
          login: {
            msg: 'Las credenciales son inválidas'
          }
        }
      });
    }
    let passwordVerificated = bcryptjs.compareSync(req.body.password, userToLogin.password)
    if (!passwordVerificated) {
      return res.render('users/login', {
        errors: {
          login: {
            msg: 'Las credenciales son inválidas'
          }
        }
      });
    }
    req.session.userLogged = await Users.userLogged(userToLogin.email);
    if(req.body.remember){
      res.cookie('userEmail', req.body.email, {maxAge: 1000*60*60});
    }
    if(req.session.userLogged){
      switch (req.session.userLogged.user_category_id) {
        case 1:
          return res.redirect('/validator/home');
        case 2:
          return res.redirect('/enterprise/home');
        case 3:
          return res.redirect('/unplastify/home');
        default:
          return res.redirect('users/login');
      }
    }
  },
  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  },
  register: async(req, res) =>{
    const userCategory = await Users.listCategory();
    return res.render('users/register', { userCategory });
  },
  processRegister: async (req, res) => {
    userInDB = await Users.findByEmail(req.body.email);
      if (userInDB) {
        const userCategory = await Users.listCategory();
        return res.render('users/register', {
          userCategory,
          errors: {
            email: {
              msg: 'Este email ya está registrado'
            }
          },
          old : req.body
        })
      }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    Users.create(req.body);
    return res.redirect('/users/login');
  }
};
module.exports = controller;
