const { uploadFile } = require("../helpers/cloud");

class ProfileController {
    index = (req, res) => {
        res.render("share/profile", {
            user: req.session.user,
        });
    };
    candidatePostData = (req, res) => {
        uploadFile(req.body.cv)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

module.exports = new ProfileController();
