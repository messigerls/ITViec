const connection = require("../config/connectDatabase");
const { getDateTimeNow } = require("../helpers/database");
class Job {
    getAllJob() {}
    insertJob(job, companyId, func) {
        const updateTime = getDateTimeNow();

        const query = `INSERT INTO job (company_id, position_id, job_title, number_of_job, min_salary, max_salary, job_description, job_require, overtime, timeserving, update_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(
            query,
            [companyId, ...Object.values(job), updateTime],
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
    updateJobById(jobId, job, func) {
        //const query = `UPDATE job SET job_title = '${job.jobTitle}', position_id = ${job.jobPosition}, number_of_job = ${job.numberOfJob}, min_salary = ${job.minSalary}, max_salary = ${job.maxSalary}, job_description = '${removeQuotation(job.jobDescription)}', require = '${removeQuotation(job.require)}', timeserving = '${job.timeServing}' WHERE job_id = ${jobId}`;
        const query = `UPDATE job SET job_title = ?, position_id = ?, number_of_job = ?, min_salary = ?, max_salary = ?, job_description = ?, job_require = ?, timeserving = ?, update_time = ? WHERE job_id = ?`;
        const updateTime = getDateTimeNow();
        connection.query(
            query,
            [
                job.jobTitle,
                job.jobPosition,
                job.numberOfJob,
                job.minSalary,
                job.maxSalary,
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
}

module.exports = new Job();
