const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const mediaSchema = new Schema({
    serial: {
        type: String,
        required: true,          // Identificador único
        unique: true,           // No puede repetirse
        trim: true
      },
      title: {
        type: String,
        required: true,          // Título obligatorio
        trim: true
      },
      synopsis: {
        type: String,
        required: true,          // Sinopsis obligatoria
        trim: true
      },
      url: {
        type: String,
        required: true,          // URL única para acceder a la película
        unique: true,           // No puede repetirse
        trim: true
      },
      image: {
        type: String,
        trim: true              // URL o ruta de la imagen de portada (opcional)
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      releaseYear: {
        type: Number,
        required: true          // Año de estreno obligatorio (ej. 2023)
      },
      genre: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al ID de un género
        ref: 'Genre',                        // Apunta al modelo Genre
        required: true                       // Género obligatorio
      },
      director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
      },
      producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer',
        required: true
      },
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
      }
    });
    
    module.exports = mongoose.model('Media', mediaSchema);
   