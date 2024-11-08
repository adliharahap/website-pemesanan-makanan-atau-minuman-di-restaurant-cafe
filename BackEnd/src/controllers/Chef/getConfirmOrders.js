const db = require("../../database/databases");

const getConfirmOrders = async(req, res) => {
    try {
        const userRole = req.user.role;

        if (userRole !== 'chef') {
            return res.status(403).json({ message: 'Akses ditolak, hanya chef yang dapat mengakses ini' });
        }

        const sql = `
            SELECT 
                orders.order_id,
                tables.table_number,
                orders.total_price,
                orders.status,
                users.username AS waiter_name,
                order_items.order_item_id,
                order_items.menu_id,
                order_items.quantity,
                order_items.notes,
                order_items.price,
                menu.name AS menu_name,
                menu.image_url AS menu_image_url
            FROM 
                orders
            JOIN 
                order_items ON orders.order_id = order_items.order_id
            JOIN 
                users ON orders.waiter_id = users.user_id
            JOIN 
                tables ON orders.table_id = tables.table_id
            JOIN 
                menu ON order_items.menu_id = menu.menu_id
            WHERE 
                orders.status = 'pending';
        `;

        db.query(sql, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Terjadi kesalahan server.', error });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Tidak ada pesanan dengan status pending.' });
            }

            const ordersMap = {};

            results.forEach(result => {
                const { order_id, table_number, total_price, status, waiter_name, order_item_id, menu_id, quantity, notes, price, menu_name, menu_image_url } = result;

                if (!ordersMap[order_id]) {
                    ordersMap[order_id] = {
                    order_id,
                    table_number,
                    total_price,
                    status,
                    waiter_name,
                    order_items: []
                    };
                }

                ordersMap[order_id].order_items.push({
                    order_item_id,
                    menu_id,
                    quantity,
                    notes,
                    price,
                    menu_name,
                    menu_image_url
                });
            });

            const orders = Object.values(ordersMap);

            return res.status(200).json({ orders });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
}

const handleConfirmedOrder = async (req, res) => {
    try {
        const userRole = req.user.role;
        const { orderId } = req.body;

        if (userRole !== 'chef') {
            return res.status(403).json({
                message: 'Akses ditolak, hanya chef yang dapat melakukan order',
            });
        }

        const query = 'UPDATE orders SET status = ? WHERE order_id = ?';
        const values = ['cooking', orderId];

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
                message: 'Status pesanan berhasil diubah menjadi cooking',
                data: { order_id: orderId, status: 'cooking' },
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

module.exports = {getConfirmOrders, handleConfirmedOrder};