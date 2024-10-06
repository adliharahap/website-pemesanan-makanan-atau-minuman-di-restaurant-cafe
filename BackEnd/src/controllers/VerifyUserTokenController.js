const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ valid: false, message: 'Token diperlukan' });
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false, message: 'Token tidak valid' });
        }

        // Jika token valid, berikan data user (username, email, role, dan id)
        res.json({
            valid: true,
            id: decoded.id, // Pastikan ID ada di payload token
            username: decoded.username,
            email: decoded.email,
            role: decoded.role
        });
    });
};

module.exports = { verifyToken };
