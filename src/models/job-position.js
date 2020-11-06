const connection = require("../config/connectDatabase");

class JobPosition{
    getAllJobPosition(func){
        const query = `SELECT * FROM job_position`;
        connection.query(query, func);
    }
}

module.exports = new JobPosition();
