const db = require("../database/databases");

const getTransactionHistory = async (req, res) => {
    try {
        // Pastikan role adalah 'cashier'
        const userRole = req.user.role;
        if (userRole === "user") {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        // Query untuk mendapatkan data transaksi
        const sql = `SELECT * FROM transaction_history;`;
        db.query(sql, (error, results) => {
            if (error) {
                console.error("Database query error:", error);
                return res.status(500).json({ message: "Terjadi kesalahan server.", error });
            }

            // Jika tidak ada data
            if (results.length === 0) {
                return res.status(200).json({ message: "Tidak ada data transaksi.", data: [] });
            }

            // Kirim data transaksi
            return res.status(200).json({ message: "Data transaksi berhasil diambil.", data: results });
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server.", error });
    }
};

module.exports = { getTransactionHistory };
