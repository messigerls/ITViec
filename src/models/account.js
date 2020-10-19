const connection = require("../config/connectDatabase");

class Account {
    getAllUsernameAndPassword(func) {
        const query = "SELECT username, password FROM account";
        return connection.query(query, func);
    }
    getAllUsernameAndPasswordByUsername(username, func) {
        const query = `SELECT username, password FROM account WHERE username = '${username}'`;
        return connection.query(query, func);
    }
    getUserByUserName(username, func) {
        const query = `SELECT * FROM account WHERE username = '${username}'`;
        return connection.query(query, func);
    }
    insertAccount(account, func) {
        const query =
            "INSERT INTO account (username, password, role, email, sdt) VALUES(?, ?, ?, ?, ?)";
        return connection.query(
            query,
            [account.username, account.password, account.role, account.email, account.sdt],
            func
        );
    }
}

module.exports = new Account();
