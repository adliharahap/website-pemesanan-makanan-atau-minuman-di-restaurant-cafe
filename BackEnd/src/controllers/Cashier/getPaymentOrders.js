const db = require("../../database/databases");

const getPaymentOrders = async(req, res) => {
    try {
        const userRole = req.user.role;

        if (userRole !== 'cashier') {
            return res.status(403).json({ message: 'Akses ditolak, hanya cashier yang dapat mengakses ini' });
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
                orders.status = 'served';
        `;

        db.query(sql, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Terjadi kesalahan server.', error });
            }

            if (results.length === 0) {
                return res.status(204).json({ message: 'Tidak ada pesanan dengan status served.' });
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

module.exports = {getPaymentOrders};