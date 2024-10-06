const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Token diperlukan' });
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token tidak valid' });
        }

        // Menyimpan data pengguna ke dalam request object
        req.user = decoded;
        next(); // Lanjut ke handler route berikutnya
    });
};

module.exports = { authenticateToken };
