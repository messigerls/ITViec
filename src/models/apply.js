const connection = require("../config/connectDatabase");
const {getDateTimeNow} = require('../helpers/database')
class Apply{
    getApplyByCandidateId(id, func){
        const query = `SELECT a.apply_id,a.candidate_id, a.job_id, a.applyTime, a.receivedTime, j.job_title FROM apply a INNER JOIN job j ON a.job_id = j.job_id WHERE a.candidate_id = ${id}`;
        connection.query(query, func);
    }
    getCandidateInfo(id, func){
        const query = `SELECT a.apply_id, a.candidate_id, a.job_id, a.applyTime, a.receivedTime, c.name,c.cv, account.email, j.job_title FROM apply a INNER JOIN candidate c ON c.candidate_id = a.candidate_id INNER JOIN account ON account.id = c.accountId INNER JOIN job j ON a.job_id = j.job_id INNER JOIN company ON company.company_id = j.company_id WHERE company.company_id = ${id}`;
        connection.query(query, func);
    }
    receivedApplyJob(id, func){
        const now = getDateTimeNow();
        const query = `UPDATE apply SET receivedTime = '${now}' WHERE apply_id = ${id}`;
        connection.query(query, func);
    }
    deleteApplyJob(id, func){
        const query = `DELETE FROM apply WHERE apply_id = ${id}`;
        connection.query(query, func);
    }
}

module.exports = new Apply();

