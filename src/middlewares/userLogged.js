const User = require('../models/Users');
const userLoggedMiddleware = async (req, res, next) => {

	res.locals.isLogged = false;
	let emailInCookie = req.cookies.userEmail;
	if (emailInCookie && !req.session.userLogged){
		req.session.userLogged = await User.userLogged(emailInCookie);
	};
	if (req.session && req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	};
	
	next();
};
module.exports = userLoggedMiddleware;