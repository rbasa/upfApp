function registeredMiddleware(req, res, next){
  if(req.session.userLogged.registered!==1){
    return res.redirect('/users/login');
  };
  console.log(req.session.userLogged.registered)
  next();
}
module.exports = registeredMiddleware;
