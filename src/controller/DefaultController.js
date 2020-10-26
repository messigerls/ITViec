class DefaultController{
    index = (req, res) => {
        res.render('guest/home', {
            user: req.session.user
        });
    }
    logout = (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    }
}

module.exports = new DefaultController;