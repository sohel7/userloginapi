
const {
    create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail
} = require("./user.service");

const bcrypt = require("bcrypt"); // ✅ Correct import
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        // Secure the password Use bcrypt functions correctly
        //const salt = bcrypt.genSaltSync(10); // ✅ Call from bcrypt
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        //body.password = bcrypt.hashSync(body.password, salt); // ✅ Call from bcrypt


        // Call the cratea Function from service
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
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

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
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result, results }, "qwe1234",
                    { expiresIn: "1h" }
                );
                return res.json({
                    success: 1,
                    message: "Login Successfully!!",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Login INvalid Email or PAssword ",
                });

            }

        });
    },

};