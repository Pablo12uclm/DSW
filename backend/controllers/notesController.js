// controllers/notesController.js

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'data', 'notes.json');

// Función para leer el archivo JSON
function readDB() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

// Función para escribir en el archivo JSON
function writeDB(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

exports.createNote = async (req, res) => {
  try {
    const db = await readDB();
    const newNote = {
      id: db.notes.length + 1,
      ...req.body,
    };
    db.notes.push(newNote);
    await writeDB(db);
    res.status(201).send(newNote);
  } catch (err) {
    res.status(500).send('Error al crear la nota');
  }

};

exports.getAllNotes = async (req, res) => {
  try {
    const db = await readDB();
    res.status(200).json(db.notes);
  } catch (err) {
    res.status(500).send('Error al obtener las notas');
  }
};


exports.updateNote = async (req, res) => {
    try {
      const { id } = req.params;
      const db = await readDB();
      const index = db.notes.findIndex(note => note.id == id);
  
      if (index === -1) {
        res.status(404).send('Nota no encontrada');
        return;
      }
  
      db.notes[index] = { ...db.notes[index], ...req.body };
      await writeDB(db);
      res.send(db.notes[index]);
    } catch (err) {
      res.status(500).send('Error al actualizar la nota');
    }
  };

  exports.deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
      const db = await readDB();
      const newNotes = db.notes.filter(note => note.id != id);
  
      if (db.notes.length === newNotes.length) {
        res.status(404).send('Nota no encontrada');
        return;
      }
  
      db.notes = newNotes;
      await writeDB(db);
      res.send({ message: 'Nota eliminada' });
    } catch (err) {
      res.status(500).send('Error al eliminar la nota');
    }
  };
  