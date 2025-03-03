const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,          // Nombre obligatorio
    unique: true,           // No puede haber dos productoras con el mismo nombre
    trim: true              // Elimina espacios
  },
  status: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  slogan: {
    type: String,
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model('Producer', producerSchema);