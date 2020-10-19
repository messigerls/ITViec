function authUser(req, res, next) {
    if (!req.user) {
        return res.status(403).send({ message: "You need to Sign In" });
    }
    next();
}

function authRole(req, res, next) {
    if (!req.user.role) {
        return res.status(401).send({ message: "Not Allowed"});
    }
    next();
}

function authLogin(req, res, next){
    if(req.session && req.session.user){
        res.redirect('/');
        
    }
    next();
}

module.exports = { authUser, authRole, authLogin };
