const jobSearch = require("../models/job-search");
const JobCompany = require('../models/job-company');
const TechJob = require('../models/techjob');
const Account = require('../models/account');
const Apply = require('../models/apply')
const Job = require('../models/job')
const { getTechJob , getDistanceTime } = require('../helpers/helper');

const {randomString} = require('../helpers/database')
class ApiController{
   renderJobList(req, res){
      
      const {city, search } = req.params;
      
      new Promise((resolve, reject) => {
         if(city && search){
            console.log(req.params)
            if(city === 'ha-noi'){
               jobSearch.searchJobByCity(search.toLowerCase(), 'Hà Nội', (err, data) => {
                  if(err) reject (err);
                  resolve(data);
               })
            }
            if(city === 'da-nang'){
               jobSearch.searchJobByCity(search.toLowerCase(), 'Đà Nẵng', (err, data) => {
                  if(err) reject (err);
                  resolve(data);
               })
            }
            if(city === 'tp-hcm'){
               jobSearch.searchJobByCity(search.toLowerCase(), 'TP HCM', (err, data) => {
                  if(err) reject (err);
                  resolve(data);
               })
            }
            jobSearch.searchJob(search.toLowerCase(), (err, data) => {
               if(err) reject (err);
               resolve(data);
            })
         }
         if(city){
            console.log(city)
            if(city == 'ha-noi'){
               jobSearch.searchJobByOnlyCity('Hà Nội', (err, data) => {
                  if(err) reject (err);
                  resolve(data);
               })
            }
            if(city == 'da-nang'){
               
               jobSearch.searchJobByOnlyCity('Đà Nẵng', (err, data) => {
                  if(err) reject (err);
                  resolve(data);
               })
            }
            if(city == 'tp-hcm'){
               jobSearch.searchJobByOnlyCity('TP HCM', (err, data) => {
                  if(err) reject (err);
                  resolve(data);
               })
            }
            
            jobSearch.searchJob('', (err, data) => {
               if(err) reject (err);
               resolve(data);
            })
         }
         
         jobSearch.searchAllJob((err, data) => {
            if(err) reject(err)
            resolve(data);
         })
      }).then(result => {
         const jobIds = result.map(e => e.job_id);
         Promise.all([
            new Promise((resolve1, reject1) => {
               JobCompany.getJobListByJobId(jobIds, (err1, data1) => {
                  if(err1) reject1(err1);
                  resolve1(data1);
               })
            }),
            new Promise((resolve1, reject1) => {
               TechJob.getTechJob((err1, data1) => {
                  if(err1) reject1(err1);
                  resolve1(data1);
               })
            })

         ]).then(result1 => {
            const techJobData = getTechJob(result1[0], result1[1]);
            const jobCompany = result1[0];
            const techJob = result1[1];
            
            jobCompany.map(e => {
               techJobData.map(tech => {
                  
                  if(tech.job_id === e.job_id){
                     Object.assign(e, {technology_arr : tech.technology_arr})
                  }
               })
            })
            res.send({
               jobCompany,
               
            })
         })
      }).catch(err => {
         return res.status(500).json({err : err})
      })
   }
   deleteApplyJob(req, res){
      const {id} = req.params;
      Apply.deleteApplyJob(id, (err, data) => {
         if(err) return res.status(500).json({ err: err });
         return res.status(200).json({ message : 'success' })
      })
   }
   getAccountIdLast(req, res){
      Account.getAccountId((err, data) => {
         res.send(data[0])
      })
   }
   getJobList(req, res){
      const { _page, _limit } = req.query;
      console.log(_page, _limit, 'search');
      const {city, search} = req.params;
      let searchCity = 'all';
      if(city === 'ha-noi') searchCity = 'Hà Nội';
      if(city === 'da-nang') searchCity = 'Đà Nẵng';
      if(city === 'tp-hcm') searchCity = 'TP HCM';
      Promise.all([
         new Promise((resolve, reject) => {
            TechJob.getTechJob((err, data) => {
               if(err) reject(err);
               resolve(data);
            })
         }),
         new Promise((resolve, reject) => {
            Job.getJobIdByCompanyName(search.toLowerCase(), searchCity, _page, _limit, (err, data) => {
               if(err) reject(err);
               //console.log(data);
               resolve([...data].map(e => e.job_id));
            })
         }),
         new Promise((resolve, reject) => {
            Job.getJobIdByJobTitle(search.toLowerCase(), searchCity, _page, _limit, (err, data) => {
               if(err) reject(err);
               //console.log(data);
               resolve([...data].map(e => e.job_id));
            })
         }),
         new Promise((resolve, reject) => {
            Job.getJobIdByPositionName(search.toLowerCase(), searchCity, _page, _limit, (err, data) => {
               if(err) reject(err);
               //console.log(data);
               resolve([...data].map(e => e.job_id));
            })
         }),
         new Promise((resolve, reject) => {
            Job.getJobIdByTechName(search.toLowerCase(), searchCity, _page, _limit,(err, data) => {
               if(err) reject(err);
               //console.log(data);
               resolve([...data].map(e => e.job_id));
            })
         }),
      ]).then(result => {
         const [techJobData, jobIdCompany, jobIdJobTitle, jobIdPosition, jobIdTech] = result;
         const jobIdData = Array.from(new Set(jobIdJobTitle.concat(jobIdCompany).concat(jobIdPosition).concat(jobIdTech)));
         //console.log(jobIdData)
         const countJob = jobIdData.length;
         //res.json(jobIdData)
         new Promise((resolve1, reject1) => {
            Job.getJobDataFromIdArr([...jobIdData].slice(_page * _limit - _limit, _page * _limit), (err, data) => {
               if(err) reject1(err);
               resolve1(data);
            })
         }).then(data => {
            const jobData = [...data];
            jobData.map(job => Object.assign(job, {distanceTime: getDistanceTime(job.update_time)}));
            const techData = getTechJob(jobData, techJobData);
            res.json({
               techData,
               jobData,
               countJob
            })
         }).catch(err => res.status(500).json({ err: err }))
         
      }).catch(err => res.status(500).json({ err: err }))
   }
   getJobListByCity(req, res){
      const { _page, _limit } = req.query;
      console.log(_page, _limit, 'no search');
      const city = req.params.city;
      const search = '';
      let cityString = 'all';
      if(city === 'ha-noi') cityString = 'Hà Nội';
      if(city === 'da-nang') cityString = 'Đà Nẵng';
      if(city === 'tp-hcm') cityString = 'TP HCM';
      Promise.all([
         new Promise((resolve, reject) => {
            Job.getJobByCitySearchLimit(cityString, _page, _limit, (err, data) => {
               if(err) reject(err);
               resolve(data)
            })
         }),
         new Promise((resolve, reject) => {
            TechJob.getTechJob((err, data) => {
               if(err) reject(err);
               resolve(data)
            })
         }),
         new Promise((resolve, reject) => {
            Job.countJobCitySearch(cityString, (err, data) => {
               if(err) reject(err)
               resolve(data[0].countJob);
            })
         })
      ]).then(result => {
         const [jobData, techJobData, countJob] = result;
         jobData.map(job => Object.assign(job, {distanceTime: getDistanceTime(job.update_time)}));
         const techData = getTechJob(jobData, techJobData);
         return res.status(200).json({
            techData,
            jobData,
            countJob
         })
      }).catch(err => res.status(500).json({ err: err }))
        
   }
   insertJobRow = async(req, res) => {
      const row = Number.parseInt(req.params.row);
      const companyIdArr = [1, 7, 8, 9, 10, 11];
      const positionIdArr = [1, 2, 3, 4, 5, 6, 7, 8];
      const overtimeArr = [0, 1];
      let index = 0;

      let result = `INSERT INTO job (company_id, position_id, job_title, number_of_job, min_salary, max_salary, job_description, job_require, overtime, timeserving, update_time) VALUES `;
      while(index < row){
         let techArr = [];
         let companyId =
               companyIdArr[Math.floor(companyIdArr.length * Math.random())];
         let positionId = positionIdArr[Math.ceil(positionIdArr.length * Math.random()) - 1]
         for (let i = 0; i < 3; i++) {
               techArr.push(Math.floor(73 * Math.random()) + 1);
         }
         let jobTitle = randomString(1, 4);
         let numberOfJob = Math.ceil(Math.random() * 4);
         let minSalary = Math.ceil(Math.random() * 1000);
         let maxSalary = Math.ceil(Math.random() * 2000) + 2000;
         let jobDescription = randomString(10, 15);
         let jobRequire = randomString(10, 15);
         let overtime = overtimeArr[Math.floor(Math.random())];
         let timeServing = "T2-T6";
         let job = {
               addPosition: positionId,
               addTitle: jobTitle,
               addNumberJob: numberOfJob,
               addMinSalary: minSalary,
               addMaxSalary: maxSalary,
               addDescription: jobDescription,
               addRequire: jobRequire,
               addOverTime: overtime,
               addTimeServing: timeServing,
         };
         const jobPromise = await Job.insertJob(job, companyId, (err, result) => {
               if(err) console.log(err)
               
         })
         //result += `(${companyId}, ${positionId}, "${jobTitle}", ${numberOfJob}, ${minSalary}, ${maxSalary}, "${jobDescription}", "${jobRequire}", ${overtime}, "${timeServing}", "${getDateTimeNow()}"), ` 
         index ++;
      }
    
   }
}

module.exports = new ApiController;