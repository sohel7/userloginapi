const pool = require("../../config/database"); // import database 

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO registration (firstName, lastName, gender, email, password, phone)
            values(?,?,?,?,?,?) `,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results);
            }

        );
    },
    getUsers: callBack => {
        pool.query(
            `select id,firstName, lastName, gender, email, phone from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserById: (id, callBack) => {
        pool.query(
            `select id,firstName, lastName, gender, email, phone from registration where id =?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update registration set firstName =?, lastName=?, gender=?, email=?, password=?, phone=? where id=?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                } if (!results) {
                    return results.json({
                        success: 0,
                        message: "Failed to update user"
                    });
                }
                return callBack(null, results);
            },
        )
    },


    deleteUser: (data, callBack) => {
        pool.query(
            `delete from registration where id =?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
};