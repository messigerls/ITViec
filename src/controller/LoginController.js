const Account = require("../models/account");
const bcrypt = require("bcrypt");

class LoginController {
    getLogin(req, res) {
        res.render("guest/login");
    }

    postLogin = (req, res) => {
        const body = req.body;
        Account.getUserByUserName(body.username, async (err, result) => {
            if (err) return res.status(500).send({ err });

            if (!result.length)
                return res
                    .status(403)
                    .send({ message: "khong tim thay ten dang nhap " });
            const comparePassword = await bcrypt.compare(
                body.password,
                result[0].password
            );
            if (!comparePassword)
                return res
                    .status(400)
                    .send({ message: "Ban da nhap sai ten hoac mat khau" });
            req.session.user = { role: result[0].role, userId: result[0].id };
            res.redirect(301, "/");
        });
    };
}

module.exports = new LoginController();
