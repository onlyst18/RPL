const Dashboard =
require("../models/dashboardModel");

const getDashboard = (req, res) => {

    Dashboard.getDashboardData(
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results[0]);
        }
    );
};

module.exports = {
    getDashboard
};