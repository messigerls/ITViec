const jobSearch = require("../models/job-search");
const JobCompany = require('../models/job-company');
const TechJob = require('../models/techjob');
const Account = require('../models/account');
const Apply = require('../models/apply')
const { getTechJob , getDistanceTime } = require('../helpers/helper');


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
}

module.exports = new ApiController;