const Job = require('../models/job');
class DefaultController{
    index = (req, res) => {
        Job.countJob((err, data) => {
            if(err) return res.status(500).json({ err: err });
            res.render('guest/home', {
                user: req.session.user,
                countJob: data[0].countJob
            });
        })
        
    }
    logout = (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    }
}

module.exports = new DefaultController;