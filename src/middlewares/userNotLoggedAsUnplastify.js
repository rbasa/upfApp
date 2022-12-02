function userMiddleware(req, res, next){
  if(!req.session.userLogged||req.session.userLogged.user_category_id!==3){
    return res.redirect('/users/login')
  }
  next();
}
module.exports = userMiddleware;
