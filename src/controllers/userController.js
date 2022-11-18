const path = require('path');
const Users = require('../models/Users');
const bcryptjs = require('bcryptjs')

const controller = {
  login:(req, res) => {
    return res.render('users/login');
  },
  redirectUser:(req,res)=>{
    console.log('se ejecuta redireccion con userLogged: ')
    console.log(req.session.userLogged)
    if(req.session.userLogged){
      switch (req.session.userLogged.user_category_id) {
        case 1:
          return res.send('view del validador');
        case 2:
          return res.redirect('/enterprise/home')
        case 3:
          return res.send('view de unplastify');
        default:
          return res.redirect('/users/login')
      }
    }
    return res.redirect('/users/login')
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
            msg: 'Las contraseña es inválida'
          }
        }
      });
    }
    req.session.userLogged = await Users.userLogged(userToLogin.user_id);
    if(req.session.userLogged){
      switch (req.session.userLogged.user_category_id) {
        case 1:
          return res.send('view del validador');
        case 2:
          return res.redirect('/enterprise/home')
        case 3:
          return res.send('view de unplastify');
        default:
          return res.redirect('users/login')
      }
    }
    return res.redirect('users/login')
  },
  register: async(req, res) =>{
    const userCategory = await Users.listCategory()
    return res.render('users/register', { userCategory });
  },
  processRegister: async (req, res) => {
    userInDB = await Users.findByEmail(req.body.email);
      if (userInDB) {
        const userCategory = await Users.listCategory()
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
    req.body.password = bcryptjs.hashSync(req.body.password, 10),
    Users.create(req.body)
    return res.redirect('/users/login')
  }
};
module.exports = controller;
