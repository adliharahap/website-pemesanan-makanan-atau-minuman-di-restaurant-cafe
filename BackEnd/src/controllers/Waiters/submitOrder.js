const db = require("../../database/databases");

const submitOrder = async (req, res) => {
    try {
        const userRole = req.user.role;

        if (userRole !== 'waiter') {
            return res.status(403).json({ message: 'Akses ditolak, hanya waiters yang dapat melakukan order' });
        }

        const { orderData, ListOrder } = req.body;

        // Mulai transaksi
        await db.query('START TRANSACTION');

        // Menyimpan data ke dalam tabel `orders`
        const orderQuery = 'INSERT INTO `orders` (`table_id`, `waiter_id`, `total_price`, `status`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, NOW(), NOW())';
        db.query(orderQuery, [
            orderData.table_id,
            orderData.waiters_id,
            orderData.totalPrice,
            'pending' 
        ], (err, result) => {
            if (err) {
                throw new Error('Gagal membuat order');
            }

            const order_id = result.insertId;

            // Memasukkan data ke dalam tabel `order_items`
            const orderItemsQuery = 'INSERT INTO `order_items` (`order_id`, `menu_id`, `quantity`, `notes`, `price`) VALUES (?, ?, ?, ?, ?)';
            ListOrder.forEach(item => {
                db.query(orderItemsQuery, [
                    order_id,
                    item.menu_id,
                    item.quantity,
                    item.notes,
                    item.price
                ], (err) => {
                    if (err) {
                        throw new Error('Gagal menyimpan order items');
                    }
                });
            });

            // Update status meja jadi 'occupied'
            const updateTableQuery = 'UPDATE `tables` SET `status` = ? WHERE `table_id` = ?';
            db.query(updateTableQuery, ['occupied', orderData.table_id], (err) => {
                if (err) {
                    throw new Error('Gagal mengupdate status meja');
                }

                // Commit transaksi
                db.query('COMMIT', (err) => {
                    if (err) {
                        throw new Error('Gagal commit transaksi');
                    }

                    res.status(201).json({ message: 'Order berhasil dibuat dan status meja diupdate!', order_id });
                });
            });
        });
        
    } catch (error) {
        // Rollback transaksi jika ada kesalahan
        db.query('ROLLBACK', () => {
            res.status(500).json({ message: 'Terjadi kesalahan saat membuat order', error: error.message });
        });
    }
};

module.exports = { submitOrder };
