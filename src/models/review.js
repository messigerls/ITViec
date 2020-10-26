const connection = require("../config/connectDatabase");

class Review{
    getReviewByCompanyId(companyId, func){
        const query = `SELECT * FROM review WHERE review_id = ${companyId}`;
        connection.query(query, func)
    }
}

module.exports = new Review();


