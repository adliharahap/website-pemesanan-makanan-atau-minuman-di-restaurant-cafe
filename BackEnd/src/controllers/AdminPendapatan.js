const db = require("../database/databases");

const AdminPendapatan = (req, res) => {
    try {
        const userRole = req.user.role;

        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat melihat pendapatan' });
        }

        // Query pendapatan harian
        const sqlHarian = `
            SELECT 
                DATE(transaction_date) AS tanggal, 
                SUM(total_amount) AS total_pendapatan
            FROM 
                transaction_history
            WHERE 
                status = 'complete'
            GROUP BY 
                DATE(transaction_date)
            ORDER BY 
                DATE(transaction_date) ASC
        `;

        // Query pendapatan bulanan
        const sqlBulanan = `
            SELECT 
                MONTH(transaction_date) AS bulan, 
                YEAR(transaction_date) AS tahun, 
                SUM(total_amount) AS total_pendapatan_bulanan
            FROM 
                transaction_history
            WHERE 
                status = 'complete' AND 
                MONTH(transaction_date) = MONTH(CURRENT_DATE()) AND 
                YEAR(transaction_date) = YEAR(CURRENT_DATE())
            GROUP BY 
                bulan, tahun
        `;

        // Jalankan kedua query
        db.query(sqlHarian, (errHarian, resultsHarian) => {
            if (errHarian) {
                console.error('Error saat mengambil data harian:', errHarian);
                return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            }

            db.query(sqlBulanan, (errBulanan, resultsBulanan) => {
                if (errBulanan) {
                    console.error('Error saat mengambil data bulanan:', errBulanan);
                    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
                }

                // Kirim hasil ke frontend
                res.status(200).json({
                    success: true,
                    pendapatan_harian: resultsHarian,
                    pendapatan_bulanan: resultsBulanan[0] // Ambil hanya satu baris data
                });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { AdminPendapatan };
