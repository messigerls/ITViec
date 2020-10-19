
class DefaultController{
    index = (req, res) => {
        console.log(req.session)
        res.render('guest/home', {
            user: req.session
        });
    }
}

module.exports = new DefaultController;