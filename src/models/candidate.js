const connection = require("../config/connectDatabase");

class Candidate{
    getCandidateById(id, func){
        const query = `SELECT * FROM candidate WHERE accountId = ${id}`;
        return connection.query(query, func)
    }
    getCandidateIdByAccountId(accountId, func){
        const query = `SELECT * FROM candidate WHERE accountId = ${accountId}`;
        return connection.query(query, func);
    }
}

module.exports = new Candidate();

