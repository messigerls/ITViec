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
    insertTechJob(jobId, techs, func){
        let values = '';
        let techJobs = [];
        Array.isArray(techs) ? techJobs = [...techs] : techJobs = [techs];
        techJobs.forEach(e => {
            values += `( ${jobId}, ${Number.parseInt(e, 10)}),`
        })
        
        const query = `INSERT INTO techjob(job_id, technology_id) VALUES ${values.substring(0, values.length - 1)};`;
        connection.query(query, func);
    }
    deleteTechJobByJobId(jobId, func){
        const query = `DELETE FROM techjob WHERE job_id = ${jobId}`;
        connection.query(query, func);
    }
    
}

module.exports = new TechJob();
