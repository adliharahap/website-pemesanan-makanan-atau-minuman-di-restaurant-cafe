require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./src/routes/usersRoutes');
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Middleware verifikasi token hanya untuk rute yang memerlukannya
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
