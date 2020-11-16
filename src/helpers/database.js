const Job = require("../models/job");
const TechJob = require("../models/techjob");
const fs = require('fs');

function removeQuotation(string) {
    return string.replace(/['"]+/g, "");
}
function getDateTimeNow() {
    const now = new Date();
    const updateTime = `${now.getFullYear()}-${
        now.getMonth() + 1 < 10
            ? "0" + (now.getMonth() + 1)
            : now.getMonth() + 1
    }-${
        now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
    } ${now.toTimeString().substring(0, 8)}`;
    return updateTime;
}
function makeid(length) {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}
function randomString(numberOfLine, numberLetterOfLine) {
    let result = "";
    for (let i = 0; i < numberOfLine - 1; i++) {
        for (let j = 0; j < numberLetterOfLine; j++) {
            result += makeid(4) + " ";
        }
        result += "\n";
    }
    for (let j = 0; j < numberLetterOfLine; j++) {
        result += makeid(4) + " ";
    }
    return result;
}
function insertRandomJobData() {
    const companyIdArr = [1, 7, 8, 9, 10, 11];
    const positionIdArr = [1, 2, 3, 4, 5, 6, 7, 8];
    const overtimeArr = [0, 1];
    let index = 0;

    
    

    // Job.insertJob(job, companyId, (err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log("Insert Job Success");
    //         Job.getJobIdLast((err, result) => {
    //             if (err) console.log(err);
    //             else {
    //                 const jobId = Number.parseInt(result[0].job_id);
    //                 TechJob.insertTechJob(
    //                     jobId,
    //                     techArr,
    //                     (err, result) => {
    //                         if (err) console.log(err);
    //                         else console.log("Insert TechJob Success");
    //                     }
    //                 );
    //             }
    //         });
    //     }
    // });
    let result = `INSERT INTO job (company_id, position_id, job_title, number_of_job, min_salary, max_salary, job_description, job_require, overtime, timeserving, update_time) VALUES `;
    while(index < 10){
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
        Job.insertJob(job, companyId, (err, result) => {
            
            
        })
        //result += `(${companyId}, ${positionId}, "${jobTitle}", ${numberOfJob}, ${minSalary}, ${maxSalary}, "${jobDescription}", "${jobRequire}", ${overtime}, "${timeServing}", "${getDateTimeNow()}"), ` 
        index ++;
        
    }
    // fs.writeFile("E:\Monhocnam3\HQTCSDL\BTL\ITViec\data.txt", result, (err) => {
    //     console.log(err)
    // })
    
}


module.exports = { removeQuotation, getDateTimeNow , randomString};
