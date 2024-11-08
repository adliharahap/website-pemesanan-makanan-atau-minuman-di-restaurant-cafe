const db = require("../database/databases");

const AddMejaToDb =async (req, res) => {
    try {
        const { noMeja, jumlahKursi, mejaAvailable } = req.body;
        const userRole = req.user.role;
    
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat menambahkan meja' });
        }
    
        // Contoh query untuk menyimpan menu ke database
        const query = 'INSERT INTO tables( table_number, seats, status) VALUES ( ? , ?, ?)';
        db.query(query, [noMeja, jumlahKursi, mejaAvailable], (err, result) => {
    
            if (err) {
                console.error('Error saat menambahkan Meja:', err);
                return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            }
            
            res.status(201).json({ message: 'Meja berhasil ditambahkan' });
        });
    } catch (error) {
        console.log("Gagal Insert Table : ", error);
    }
}

const getAlltable = async (req, res) => {
    try {
        let sql = 'SELECT * FROM tables';
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
        console.log('gagal mendapatkan data table : ', error);
    }
};

module.exports = { AddMejaToDb, getAlltable };