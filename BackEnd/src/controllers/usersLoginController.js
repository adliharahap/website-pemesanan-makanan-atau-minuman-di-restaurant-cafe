const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/databases');

const postLoginUser = async (req, res) => {
    const { emailInput, passwordInput } = req.body;

    // Cari user di database
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [emailInput], async (err, results) => {
        if (err) {
            console.error('Error saat mencari user:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Email tidak ditemukan' });
        }

        const user = results[0];

        // Bandingkan password
        const isMatch = await bcrypt.compare(passwordInput, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.user_id, email: user.email, username: user.username, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '24h' } // Token akan expired dalam 24 jam
        );

        res.json({ message: 'Login berhasil', token });
    });
};

module.exports = { postLoginUser };
