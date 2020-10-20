class DefaultController{
    index = (req, res) => {
        res.render('guest/home', {
            user: req.session.user
        });
    }
}

module.exports = new DefaultController;