const db = require("../database/databases");


const getTableOrdersData = async (req, res) => {
    try {
        const userRole = req.user.role;
        const { tableNumber } = req.body;

        if (userRole !== 'admin' && userRole !== 'waiter') {
            return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat mengakses ini' });
        }

        if (!tableNumber) {
            return res.status(400).json({ message: 'Nomor meja tidak ditemukan dalam body.' });
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
                tables.table_number = ?;
        `;

        db.query(sql, [tableNumber], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Terjadi kesalahan server.', error });
            }

            if (results.length === 0) {
                return res.status(204).json({ message: 'Tidak ada pesanan di Meja ini.' });
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

module.exports = { getTableOrdersData };
