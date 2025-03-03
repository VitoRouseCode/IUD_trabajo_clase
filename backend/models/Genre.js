const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,        
    unique: true,           
    trim: true              
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
  description: {
    type: String,
    trim: true             
  }
});


module.exports = mongoose.model('Genre', genreSchema);