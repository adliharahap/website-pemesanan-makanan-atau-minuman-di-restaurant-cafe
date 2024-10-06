const db = require("../database/databases");

const editRoleUser = async (req, res) => {
    try {
        const { userId, newRole } = req.body; 
        const userRole = req.user.role; 
    
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat mengubah role pengguna' });
        }
    
        // Validasi input
        if (!userId || !newRole) {
            return res.status(400).json({ message: 'userId dan newRole harus disediakan' });
        }
    
        const query = 'UPDATE users SET role = ? WHERE user_id = ?';
    
        db.query(query, [newRole, userId], (err, result) => {
            if (err) {
                console.error('Error saat mengubah role pengguna:', err);
                return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
            }
    
            res.status(200).json({ message: 'Role pengguna berhasil diubah' });
        });
    } catch (error) {
        console.log('error update role user : ', error);
    }
};

const deleteUserData = async (req, res) => {
    try {
        const { userId } = req.body; 
        const userRole = req.user.role; 
    
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Akses ditolak, hanya admin yang dapat mengubah role pengguna' });
        }
    
        if (!userId) {
            return res.status(400).json({ message: 'userId harus disediakan' });
        }
    
        const query = 'DELETE FROM users WHERE user_id = ?';
    
        db.query(query, [userId], (err, result) => {
            if (err) {
                console.error('Error saat menghapus pengguna:', err);
                return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
            }
    
            res.status(200).json({ message: 'Role pengguna berhasil diubah' });
        });
    } catch (error) {
        console.log('error hapus user : ', error);
    }
};


module.exports = { editRoleUser, deleteUserData };