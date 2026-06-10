const UserModel = require("../models/userModel");

const login = (req, res) => {
    const { username, password } = req.body;

    UserModel.findUserByUsername(username, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Password salah"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login berhasil",
            user: {
                id: user.id_user,
                username: user.username,
                role: user.role
            }
        });

    });
};

module.exports = {
    login
};