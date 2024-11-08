const db = require("../../database/databases");


const changeStatusOrderToServedController = async (req, res) => {
    try {
        const userRole = req.user.role;
        const { orderId } = req.body;

        if (userRole !== 'waiter') {
            return res.status(403).json({
                message: 'Akses ditolak, hanya waiters yang dapat melakukan order',
            });
        }

        const query = 'UPDATE orders SET status = ? WHERE order_id = ?';
        const values = ['served', orderId];

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengubah status pesanan',
                    error: err,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Pesanan tidak ditemukan atau telah diupdate',
                });
            }

            res.status(200).json({
                message: 'Status pesanan berhasil diubah menjadi served',
                data: { order_id: orderId, status: 'served' },
            });
        });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: e,
        });
    }
};

module.exports = { changeStatusOrderToServedController };
