function guestMiddleware(req, res, next){
  if(req.session.userLogged){
    return res.redirect('/users/redirectUser')
  }
  next();
}

module.exports = guestMiddleware
