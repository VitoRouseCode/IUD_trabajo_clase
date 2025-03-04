const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,          // Nombres son obligatorios
    trim: true              // Elimina espacios sobrantes
  },
  status: {
    type: String,
    enum: ['Activo', 'Inactivo'], // Solo permite estos valores
    default: 'Activo'       // Por defecto, activo
  },
  createdAt: {
    type: Date,
    default: Date.now       
  },
  updatedAt: {
    type: Date,
    default: Date.now       // Fecha actual, se actualizará al editar
  }
});

module.exports = mongoose.model('Director', directorSchema);