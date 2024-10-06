const db = require("../database/databases");

const addMenutoDb = async (req, res) => {
    const { namaMenu, deskripsi, harga, imageUrl, type, stock } = req.body;
    const userRole = req.user.role;

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat menambahkan menu' });
    }

    // Contoh query untuk menyimpan menu ke database
    const query = 'INSERT INTO menu (name, description, price, image_url, type, stock) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [namaMenu, deskripsi, harga, imageUrl, type, stock], (err, result) => {

        if (err) {
            console.error('Error saat menambahkan menu:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
        
        res.status(201).json({ message: 'Menu berhasil ditambahkan' });
    });
};

const editMenuToDb = async(req, res) => {
    const { menuId, namaMenu, deskripsi, harga, imageUrl, type, stock } = req.body;
    const userRole = req.user.role;

    // Cek apakah pengguna memiliki peran admin
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat mengedit menu' });
    }

    // Cek apakah menuId diberikan
    if (!menuId) {
        return res.status(400).json({ message: 'Menu ID harus disediakan untuk mengedit menu' });
    }

    // Contoh query untuk memperbarui menu di database
    const query = `
        UPDATE menu
        SET 
            name = ?,
            description = ?,
            price = ?,
            image_url = ?,
            type = ?,
            stock = ?
        WHERE menu_id = ?
    `;

    db.query(query, [namaMenu, deskripsi, harga, imageUrl, type, stock, menuId], (err, result) => {
        if (err) {
            console.error('Error saat mengedit menu:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Menu tidak ditemukan' });
        }

        res.status(200).json({ message: 'Menu berhasil diperbarui' });
    });
}

const deleteMenu = async (req, res) => {
    const { menuId } = req.body;
    const userRole = req.user.role;

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat menghapus menu' });
    }

    if (!menuId) {
        return res.status(400).json({ message: 'Menu ID harus disediakan untuk menghapus menu' });
    }

    const query = 'DELETE FROM menu WHERE menu_id = ?';

    db.query(query, [menuId], (err, result) => {
        if (err) {
            console.error('Error saat menghapus menu:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Menu tidak ditemukan' });
        }

        res.status(200).json({ message: 'Menu berhasil dihapus' });
    });
};


module.exports = { addMenutoDb, editMenuToDb, deleteMenu };