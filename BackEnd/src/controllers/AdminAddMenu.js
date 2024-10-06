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

module.exports = { addMenutoDb };