const connection = require("../config/connectDatabase");

class Technology{
    getAllTech(func){
        const query = `SELECT * FROM technology`;
        connection.query(query, func);
    }
}

module.exports = new Technology();
