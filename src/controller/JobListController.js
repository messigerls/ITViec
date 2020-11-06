class JobListController{
    index = (req, res) => {
        const {search, city} = req.query;
        if(search && city){
            const newSearch = search.trim().replace(/(\s)+/g, '-').toString();
            res.redirect(`job-list/${city}/${newSearch}`)
        }
        if(city){
            res.redirect(`job-list/${city}`)
        }
        res.render('guest/joblist', {
            user: req.session.user
        });
    }
    renderSearch(req, res){
        res.render('guest/joblist', {
            user: req.session.user
        });
    }
}

module.exports = new JobListController;