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
    getUserById(id, func){
        const query = `SELECT * FROM account WHERE id = ${id}`;
        return connection.query(query, func);
    }
    getAccountId( func){
        const query = `SELECT id FROM account ORDER BY account.id DESC LIMIT 1`;
        return connection.query(query, func)
    }
    getEmailAndPhoneById(id, func){
        const query = `SELECT email,sdt FROM account WHERE id = ${id}`;
        return connection.query(query, func);
    }
    insertAccount(accountId, account, func) {
        const query =
            "INSERT INTO account (id, username, password, role, email, sdt) VALUES(?, ?, ?, ?, ?, ?)";
        return connection.query(
            query,
            [accountId, account.username, account.password, account.role, account.email, account.sdt],
            func
        );
    }
    
}

module.exports = new Account();
