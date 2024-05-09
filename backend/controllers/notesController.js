// controllers/notesController.js


const Note = require('../models/note'); // Asegúrate de que la ruta al modelo es correcta

exports.getAllNotes = async (req, res) => {
  try {
      const notes = await Note.find();
      res.status(200).json(notes);
  } catch (err) {
      console.error('Failed to fetch notes:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createNote = async (req, res) => {
  try {
      const { title, content, items, images } = req.body;
      const userId = req.user.id; // Asegúrate de que el middleware isAuthenticated está siendo usado en esta ruta.

      const newNote = new Note({
          title,
          content,
          items,
          images,
          user: userId // Añadir el userId
      });

      await newNote.save();
      res.status(201).json(newNote);
  } catch (err) {
      console.error('Failed to create note:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json(note);
  } catch (err) {
    console.error('Error al actualizar la nota:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json({ message: 'Nota eliminada' });
  } catch (err) {
    console.error('Error al eliminar la nota:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
