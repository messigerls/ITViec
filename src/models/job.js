const connection = require("../config/connectDatabase");
const { getDateTimeNow } = require("../helpers/database");
class Job {
    getAllJob() {}
   
    insertJob(job, companyId, func) {
        const updateTime = getDateTimeNow();
        const query = `INSERT INTO job (company_id, position_id, job_title, number_of_job, min_salary, max_salary, job_description, job_require, overtime, timeserving, update_time) VALUES (${companyId}, ${job.addPosition}, "${job.addTitle}", ${job.addNumberJob}, ${job.addMinSalary == null || undefined ? 0 : job.addMinSalary}, ${job.addMaxSalary == null || undefined ? 0 : job.addMaxSalary}, "${job.addDescription}", "${job.addRequire}", ${job.addOverTime}, "${job.addTimeServing}", "${updateTime}")`;
        connection.query(
            query,
            func
        );
    }
    getAllMyJobInfoByCompanyId(companyId, func) {
        const query = `SELECT * FROM job WHERE company_id = ${companyId}`;
        connection.query(query, func);
    }
    getJobById(jobId, func) {
        const query = `SELECT * FROM job WHERE job_id = ${jobId}`;
        connection.query(query, func);
    }
    getJobIdLast(func){
        const query = `SELECT job_id FROM job ORDER BY job.job_id  DESC LIMIT 1`;
        connection.query(query, func);
    }
    updateJobById(jobId, job, func) {
        let minSalary = job.minSalary == null || undefined ? 0 : job.minSalary;
        let maxSalary = job.maxSalary == null || undefined ? 0 : job.maxSalary;
        //const query = `UPDATE job SET job_title = '${job.jobTitle}', position_id = ${job.jobPosition}, number_of_job = ${job.numberOfJob}, min_salary = ${job.minSalary}, max_salary = ${job.maxSalary}, job_description = '${removeQuotation(job.jobDescription)}', require = '${removeQuotation(job.require)}', timeserving = '${job.timeServing}' WHERE job_id = ${jobId}`;
        const query = `UPDATE job SET job_title = ?, position_id = ?, number_of_job = ?, min_salary = ?, max_salary = ?, job_description = ?, job_require = ?, timeserving = ?, update_time = ? WHERE job_id = ?`;
        const updateTime = getDateTimeNow();
        connection.query(
            query,
            [
                job.jobTitle,
                job.jobPosition,
                job.numberOfJob,
                minSalary,
                maxSalary,
                job.jobDescription,
                job.require,
                job.timeServing,
                updateTime,
                jobId,
            ],
            func
        );
    }
    deleteJobById(jobId, func) {
        const query = `DELETE FROM job WHERE job_id = ${jobId}`;
        connection.query(query, func);
    }
    getJobAndCompanyInfo(jobId, func){
        const query = `SELECT * FROM job j INNER JOIN company c ON j.company_id = c.company_id INNER JOIN province p ON p.province_id = c.province_id WHERE j.job_id = ${jobId}`;
        connection.query(query, func);
    }
    getJobByCitySearch(search, func){
        const queryCity = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id WHERE p.province_name = '${search}'`;
        const queryAll = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id`;
        if(search == 'all'){
            connection.query(queryAll, func)
        }
        connection.query(queryCity, func);
    }
    getJobByCitySearchLimit(search, page, limit, func){
        const offset = (page - 1) * limit;
        const queryCity = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id WHERE p.province_name = '${search}' LIMIT ${offset}, ${limit}`;
        const queryAll = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id  LIMIT ${offset}, ${limit}`;
        if(search == 'all'){
            connection.query(queryAll, func)
        }else{
            connection.query(queryCity, func);
        }
    }
    countJobCitySearch(search, func){
        const queryCity = `SELECT COUNT(job_id) AS countJob FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id WHERE p.province_name = '${search}'`;
        const queryAll = `SELECT COUNT(j.job_id) AS countJob FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id`;
        if(search == 'all'){
            connection.query(queryAll, func)
        }else{
            connection.query(queryCity, func);
        }
        
    }
    getJobBySearch(search, city, func){ 
        const queryAll = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name,  t.technology_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id INNER JOIN job_position jp ON j.position_id = jp.position_id INNER JOIN techjob tj ON tj.job_id = j.job_id INNER JOIN technology t ON t.technology_id = tj.technology_id WHERE LOWER(c.company_name) LIKE '%${search}%' OR LOWER(j.job_title) LIKE '%${search}%' OR LOWER(jp.position_name) LIKE '%$${search}%' OR LOWER(t.technology_name) LIKE '%${search}%' GROUP BY j.job_id`;
        const queryCity = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name,  t.technology_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id INNER JOIN job_position jp ON j.position_id = jp.position_id INNER JOIN techjob tj ON tj.job_id = j.job_id INNER JOIN technology t ON t.technology_id = tj.technology_id WHERE p.province_name = '${city}' AND (LOWER(c.company_name) LIKE '%${search}%' OR LOWER(j.job_title) LIKE '%${search}%' OR LOWER(jp.position_name) LIKE '%$${search}%' OR LOWER(t.technology_name) LIKE '%${search}%') GROUP BY j.job_id`;
        if(city == 'all'){
             connection.query(queryAll, func);
        }else{
            connection.query(queryCity, func);
        }
    }
    getJobBySearchLimit(search, city, page, limit, func){ 
        const offset = (page - 1) * limit;
        const queryAll = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name,  t.technology_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id INNER JOIN job_position jp ON j.position_id = jp.position_id INNER JOIN techjob tj ON tj.job_id = j.job_id INNER JOIN technology t ON t.technology_id = tj.technology_id WHERE LOWER(c.company_name) LIKE '%${search}%' OR LOWER(j.job_title) LIKE '%${search}%' OR LOWER(jp.position_name) LIKE '%$${search}%' OR LOWER(t.technology_name) LIKE '%${search}%' GROUP BY j.job_id  LIMIT ${offset}, ${limit}`;
        const queryCity = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name,  t.technology_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id INNER JOIN job_position jp ON j.position_id = jp.position_id INNER JOIN techjob tj ON tj.job_id = j.job_id INNER JOIN technology t ON t.technology_id = tj.technology_id WHERE p.province_name = '${city}' AND (LOWER(c.company_name) LIKE '%${search}%' OR LOWER(j.job_title) LIKE '%${search}%' OR LOWER(jp.position_name) LIKE '%$${search}%' OR LOWER(t.technology_name) LIKE '%${search}%') GROUP BY j.job_id  LIMIT ${offset}, ${limit}`;
        if(city == 'all'){
             connection.query(queryAll, func);
        }else{
            connection.query(queryCity, func);
        }
    }
    countJobSearch(search, city, func){
        const queryAll = `SELECT COUNT(j.job_id) AS countJob FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id INNER JOIN job_position jp ON j.position_id = jp.position_id INNER JOIN techjob tj ON tj.job_id = j.job_id INNER JOIN technology t ON t.technology_id = tj.technology_id WHERE LOWER(c.company_name) LIKE '%${search}%' OR LOWER(j.job_title) LIKE '%${search}%' OR LOWER(jp.position_name) LIKE '%$${search}%' OR LOWER(t.technology_name) LIKE '%${search}%' GROUP BY j.job_id`;
        const queryCity = `SELECT COUNT(j.job_id) AS countJob FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id INNER JOIN job_position jp ON j.position_id = jp.position_id INNER JOIN techjob tj ON tj.job_id = j.job_id INNER JOIN technology t ON t.technology_id = tj.technology_id WHERE p.province_name = '${city}' AND (LOWER(c.company_name) LIKE '%${search}%' OR LOWER(j.job_title) LIKE '%${search}%' OR LOWER(jp.position_name) LIKE '%$${search}%' OR LOWER(t.technology_name) LIKE '%${search}%') GROUP BY j.job_id`;
        if(city == 'all'){
             connection.query(queryAll, func);
        }else{
            connection.query(queryCity, func);
        }
    }
    countJob(func){
        const query = `SELECT COUNT(job_id) AS countJob FROM job`;
        connection.query(query, func);
    }
    getJobIdByJobTitle(search, city, page, limit, func){
        const offset = (page - 1) * limit;
        const queryAll = `SELECT j.job_id FROM job j WHERE LOWER(j.job_title) LIKE '%${search}%' `;
        let cityId = null;
        if(city == 'Hà Nội'){
            cityId = 1;
        }
        if(city == 'Đà Nẵng'){
            cityId = 3;
        }
        if(city == 'TP HCM'){
            cityId = 2;
        }
        const queryCity = `SELECT j.job_id FROM job j INNER JOIN company c ON c.company_id = j.company_id  WHERE c.province_id = '${cityId}' AND LOWER(j.job_title) LIKE '%${search}%'`
        if(city == 'all'){
             connection.query(queryAll, func);
        }else{
            connection.query(queryCity, func);
        }
    }
    getJobIdByCompanyName(search, city, page, limit, func){
        const offset = (page - 1) * limit;
        const queryAll = `SELECT j.job_id FROM job j INNER JOIN company c ON c.company_id = j.company_id WHERE LOWER(c.company_name) LIKE '%${search}%' `;
        let cityId = null;
        if(city == 'Hà Nội'){
            cityId = 1;
        }
        if(city == 'Đà Nẵng'){
            cityId = 3;
        }
        if(city == 'TP HCM'){
            cityId = 2;
        }
        const queryCity = `SELECT j.job_id FROM job j INNER JOIN company c ON c.company_id = j.company_id  WHERE c.province_id = '${cityId}' AND LOWER(c.company_name) LIKE '%${search}%'`;
        if(city == 'all'){
             connection.query(queryAll, func);
        }else{
            connection.query(queryCity, func);
        }
    }
    getJobIdByPositionName(search, city, page, limit, func){
        const offset = (page - 1) * limit;
        const queryAll = `SELECT j.job_id FROM job j INNER JOIN job_position jp ON jp.position_id = j.position_id WHERE LOWER(jp.position_name) LIKE '%${search}%' `;
        let cityId = null;
        if(city == 'Hà Nội'){
            cityId = 1;
        }
        if(city == 'Đà Nẵng'){
            cityId = 3;
        }
        if(city == 'TP HCM'){
            cityId = 2;
        }
        const queryCity = `SELECT j.job_id FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN job_position jp ON jp.position_id = j.position_id WHERE c.province_id = '${cityId}' AND LOWER(jp.position_name) LIKE '%${search}%' `;
        if(city == 'all'){
             connection.query(queryAll, func);
        }else{
            connection.query(queryCity, func);
        }
    }
    getJobIdByTechName(search, city, page, limit, func){
        const offset = (page - 1) * limit;
        const queryAll = `SELECT j.job_id FROM job j INNER JOIN techjob tj ON tj.job_id = j.job_id INNER JOIN technology t ON t.technology_id = tj.technology_id WHERE LOWER(t.technology_name) LIKE '%${search}%' `;
        let cityId = null;
        if(city == 'Hà Nội'){
            cityId = 1;
        }
        if(city == 'Đà Nẵng'){
            cityId = 3;
        }
        if(city == 'TP HCM'){
            cityId = 2;
        }
        const queryCity = `SELECT j.job_id FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN techjob tj ON tj.job_id = j.job_id INNER JOIN technology t ON t.technology_id = tj.technology_id WHERE c.province_id = '${cityId}' AND LOWER(t.technology_name) LIKE '%${search}%'`;
        if(city == 'all'){
             connection.query(queryAll, func);
        }else{
            connection.query(queryCity, func);
        }
    }
    getJobDataFromIdArr(idArr, func){
        const idArrString = `(${idArr.toString()})`;
        const query = `SELECT j.job_id, j.company_id, j.number_of_job, j.job_title, j.min_salary, j.max_salary, j.job_description, j.update_time, c.company_avatar, p.province_id, p.province_name FROM job j INNER JOIN company c ON c.company_id = j.company_id INNER JOIN province p ON p.province_id = c.province_id INNER JOIN job_position jp ON j.position_id = jp.position_id WHERE job_id IN ${idArrString}`;
        connection.query(query, func);
    }
    
}

module.exports = new Job();
