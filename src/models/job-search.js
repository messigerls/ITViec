const connection = require("../config/connectDatabase");

class JobSearch{
    searchJob(string, func){
        const query = `SELECT DISTINCT job_id FROM job_search WHERE LOWER(company_name) LIKE '%${string}%' OR LOWER(position_name) LIKE '%${string}%' OR LOWER(technology_name) LIKE '%${string}%'`;
        connection.query(query, func);
    }
    searchJobByCity(string, city, func){
        const query = `SELECT DISTINCT job_id FROM job_search WHERE (LOWER(company_name) LIKE '%${string}%' OR LOWER(position_name) LIKE '%${string}%' OR LOWER(technology_name) LIKE '%${string}%') AND province_name = '${city}'`;
        connection.query(query, func)
    }
    searchJobByOnlyCity(city, func){
        const query = `SELECT DISTINCT job_id FROM job_search WHERE province_name = '${city}'`;
        connection.query(query, func)
    }
    searchAllJob(func){
        const query = `SELECT DISTINCT job_id FROM job_search`;
        connection.query(query, func);
    }
}   

module.exports = new JobSearch();

