const connection = require("../config/connectDatabase");

class TechJob{
    getTechJob(func){
        const query = `SELECT tj.techjob_id, tj.job_id , tj.technology_id, t.technology_name FROM techjob tj INNER JOIN technology t ON tj.technology_id = t.technology_id `;
        connection.query(query, func);
    }
    getTechJobByJobId(jobId, func){
        const query = `SELECT tj.job_id, t.technology_id, t.technology_name FROM techjob tj INNER JOIN technology t ON tj.technology_id = t.technology_id WHERE tj.job_id = ${jobId}`
        connection.query(query, func);
    }
}

module.exports = new TechJob();
