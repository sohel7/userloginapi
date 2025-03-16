
const {
    create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
} = require("./user.service");
const bcrypt = require("bcrypt"); // ✅ Correct import

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        // Use bcrypt functions correctly
        const salt = bcrypt.genSaltSync(10); // ✅ Call from bcrypt
        body.password = bcrypt.hashSync(body.password, salt); // ✅ Call from bcrypt

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, salt);

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "Update Successfully!!"
            });

        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            } if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "Data deleted Successfullay!"
            });

        });
    }

};