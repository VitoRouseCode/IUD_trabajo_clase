const express = require('express');
const conectDB = require('./config/db_conect_mongo');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON en las peticiones

conectDB();


app.use('/api/genres', require('./routes/genreRoutes'));
app.use('/api/directors', require('./routes/directorRoutes'));
app.use('/api/producers', require('./routes/producerRoutes'));
app.use('/api/medias', require('./routes/mediaRoutes'));
app.use('/api/types', require('./routes/typesRoutes'));


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});