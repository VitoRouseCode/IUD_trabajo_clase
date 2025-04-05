const express = require('express');
const conectDB = require('./config/db_conect_mongo');
const app = express();
require('dotenv').config(); 
const portConf = process.env.PORT; 
const port = portConf;

app.use(express.json()); // Middleware para parsear JSON en las peticiones

conectDB();

//politicas de cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


app.use('/api/genres', require('./routes/genreRoutes'));
app.use('/api/directors', require('./routes/directorRoutes'));
app.use('/api/producers', require('./routes/producerRoutes'));
app.use('/api/medias', require('./routes/mediaRoutes'));
app.use('/api/types', require('./routes/typesRoutes'));


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});