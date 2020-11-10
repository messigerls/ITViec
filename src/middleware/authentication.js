function authUser(req, res, next) {
    if (!req.user) {
        res.redirect('/login')
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

function authLogout(req, res, next){
    if(req.session && req.session.user){
        next()
    }
    return res.status(404).send({ message : 'Not Found' })
}

function authCandidate(req, res, next){
    if(req.session.user.role == 1){
        next()
    }
    res.json({ message: 'Not Allowed' })
}
function authCompany(req, res, next){
    if(req.session.user.role == 2){
        next()
    }
    res.json({ message: 'Not Allowed' })
}

module.exports = { authUser, authRole, authLogin, authLogout, authCandidate, authCompany };
