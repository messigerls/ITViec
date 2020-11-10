const TechJob = require('../models/techjob');
const Job = require('../models/job');
const {getTechJob, getDistanceTime} = require('../helpers/helper')
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
    }
    
    renderSearch(req, res){
        const {city, search} = req.params;
        let searchCity = 'all';
        if(city === 'ha-noi') searchCity = 'Hà Nội';
        if(city === 'da-nang') searchCity = 'Đà Nẵng';
        if(city === 'tp-hcm') searchCity = 'TP HCM';
        Promise.all([
            new Promise((resolve, reject) => {
                Job.getJobBySearch(search.toLowerCase(), searchCity, (err, data) => {
                    if(err) reject(err)
                    resolve(data);
                })
            }),
            new Promise((resolve, reject) => {
                TechJob.getTechJob((err, data) => {
                    if(err) reject(err);
                    resolve(data);
                })
            })
        ]).then(result => {
            const [jobData, techJobData] = result;
            jobData.map(job => Object.assign(job, {distanceTime: getDistanceTime(job.update_time)}));
            const techData = getTechJob(jobData, techJobData);
            
            res.render('guest/joblist', {
                user: req.session.user,
                techData,
                jobData,
                city, 
                search
            })
        }).catch(err => res.status(500).json({ err: err }))
    }
    renderCitySearch(req, res){
        const city = req.params.city;
        const search = '';
        let cityString = 'all';
        if(city === 'ha-noi') cityString = 'Hà Nội';
        if(city === 'da-nang') cityString = 'Đà Nẵng';
        if(city === 'tp-hcm') cityString = 'TP HCM';
        Promise.all([
            new Promise((resolve, reject) => {
                Job.getJobByCitySearch(cityString, (err, data) => {
                    if(err) reject(err);
                    resolve(data)
                })
            }),
            new Promise((resolve, reject) => {
                TechJob.getTechJob((err, data) => {
                    if(err) reject(err);
                    resolve(data)
                })
            })
        ]).then(result => {
            const [jobData, techJobData] = result;
            jobData.map(job => Object.assign(job, {distanceTime: getDistanceTime(job.update_time)}));
            const techData = getTechJob(jobData, techJobData);
            
            res.render('guest/joblist', {
                user: req.session.user,
                techData,
                jobData,
                city,
                search
            })
        }).catch(err => res.status(500).json({ err: err }))
        

    }
}

module.exports = new JobListController;