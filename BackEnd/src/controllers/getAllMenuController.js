const db = require("../database/databases");

const getAllMenu = async (req, res) => {
    try {
        let sql = 'SELECT * FROM menu';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error saat mengambil data:', err);
                res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            } else {
                res.status(200).json({
                    success: true,
                    data: results,
                });
            }
        });
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch menus.',
            error: error.message,
        });
    }
};

module.exports = { getAllMenu };
