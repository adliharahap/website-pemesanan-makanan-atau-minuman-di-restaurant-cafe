const db = require("../database/databases");


const PesananSaatIni = async (req, res) => {
    try {
        const userRole = req.user.role;
    
        if (userRole !== 'admin' && userRole !== 'waiter') {
            return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat menambahkan meja' });
        }

        let sql = `SELECT 
                orders.order_id,
                tables.table_number,
                orders.total_price,
                orders.status,
                orders.waiter_id,
                users.username AS waiter_name,
                orders.created_at
            FROM 
                orders
            JOIN 
                users ON orders.waiter_id = users.user_id
            JOIN 
                tables ON orders.table_id = tables.table_id;`;
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
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

module.exports ={ PesananSaatIni };