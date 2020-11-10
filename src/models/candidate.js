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
    insertCandidateByAccountId(accountId, name, func){
        const query = `INSERT INTO candidate( name, accountId) VALUES('${name}', ${accountId})`;
        connection.query(query, func);
    }
    updateCandidate(candidate, cv, candidateId, func){
        let query = '';
        if(cv){
            query = `UPDATE candidate SET name = '${candidate.name}', gender = '${candidate.gender}', dob = '${candidate.dob}', cv = '${cv}' WHERE candidate_id = ${candidateId}`;
        }else{
            query = `UPDATE candidate SET name = '${candidate.name}', gender = '${candidate.gender}', dob = '${candidate.dob}' WHERE candidate_id = ${candidateId}`;
        }
        
        connection.query(query, func);
    }
}

module.exports = new Candidate();

