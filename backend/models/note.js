const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  items: [String], 
  images: [String], 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Referencia al modelo de usuario
}, { timestamps: true }); // Timestamps para registrar la creación y actualización

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
