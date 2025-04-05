const mongoose = require('mongoose');
require('dotenv').config();

const conectdbmongo = async () => {
    const db = process.env.MONGO_URI;
const url = db;
    try {
        await mongoose.connect(url);
        console.log('Conexión a la base de datos establecida.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
    }

module.exports = conectdbmongo;