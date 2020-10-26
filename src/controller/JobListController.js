class JobListController{
    index = (req, res) => {
        res.render('guest/jobList', {
            user: req.session.user
        });
    }
}

module.exports = new JobListController;