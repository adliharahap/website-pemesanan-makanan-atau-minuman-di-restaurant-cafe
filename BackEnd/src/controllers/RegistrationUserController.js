const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/databases');

const SECRET_KEY = process.env.SECRET_KEY; // Mengambil secret key dari .env

const getAllUsers = (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error saat mengambil data:', err);
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        } else {
            res.json(results);
        }
    });
};

const postRegistrationUserToDb = (req, res) => {
    const { usernameInput, emailInput, PasswordInput, confirmPasswordInput } = req.body;
    
    // Validasi di backend
    if (PasswordInput !== confirmPasswordInput) {
        return res.status(400).json({ message: 'Password dan konfirmasi tidak cocok!' });
    }

    // Hash password sebelum menyimpan
    bcrypt.hash(PasswordInput, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error saat hashing password:', err);
            return res.status(500).json({ message: 'Registrasi gagal hashing password : ' });
        }

        // Simpan ke database setelah validasi sukses
        const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
        db.query(query, [usernameInput, hashedPassword, emailInput, 'user'], (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Registrasi gagal : ', err });
            } else {
                // Buat token setelah registrasi
                
                const token = jwt.sign(
                    { id: result.insertId, email: emailInput, username: usernameInput, role: 'user' },
                    SECRET_KEY,
                    { expiresIn: '24h' }
                );
                
                res.status(200).json({ message: 'Registrasi berhasil', userId: result.insertId, token });
            }
        });
    });
};

module.exports = { getAllUsers, postRegistrationUserToDb };
