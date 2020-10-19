const mysql = require("mysql");
const connect = {
    host: "localhost",
    user: "root",
    password: "",
    database: "vieclamit",
};

const connection = mysql.createPool({
    ...connect
});


module.exports = connection;
