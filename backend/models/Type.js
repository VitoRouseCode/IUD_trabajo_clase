const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,          // Nombre obligatorio (ej. "Película", "Serie")
    unique: true,           // Evita duplicados
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true              // Opcional
  }
});

module.exports = mongoose.model('Type', typeSchema);