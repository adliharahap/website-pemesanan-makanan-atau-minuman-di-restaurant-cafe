const db = require("../../database/databases");

const handleUpdateStockMenu = async(req, res) => {
    try {
        const { menuId, stock } = req.body;
        const userRole = req.user.role;

        // Cek apakah pengguna memiliki peran admin
        if (userRole !== 'chef') {
            return res.status(403).json({ message: 'Akses ditolak, hanya chef yang dapat mengedit menu' });
        }

        // Cek apakah menuId diberikan
        if (!menuId) {
            return res.status(400).json({ message: 'Menu ID harus disediakan untuk mengedit menu' });
        }

        // Contoh query untuk memperbarui menu di database
        const query = `
            UPDATE menu
            SET
                stock = ?
            WHERE menu_id = ?
        `;

        db.query(query, [stock, menuId], (err, result) => {
            if (err) {
                console.error('Error saat mengedit menu:', err);
                return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Menu tidak ditemukan' });
            }

            res.status(200).json({ message: 'Menu berhasil diperbarui' });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

module.exports = {handleUpdateStockMenu};