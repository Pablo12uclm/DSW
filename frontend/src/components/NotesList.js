import React, { useEffect, useState } from 'react';
import Note from './Note'; // Asegúrate de tener este componente
import NoteForm from './NoteForm'; // Asegúrate de tener este componente
import '../styles/App.css'

function NotesList() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    fetch('http://localhost:3000/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  };

  const addNote = (note) => {
    fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
    .then(response => response.json())
    .then(newNote => {
      setNotes([...notes, newNote]); // Agregar la nueva nota al estado
    })
    .catch(error => console.error('Error adding note:', error));
  };

  const updateNote = (id, updatedNote) => {
    fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNote),
    })
    .then(response => response.json())
    .then(updatedNote => {
      const updatedNotes = notes.map(note => {
        if (note.id === id) {
          return updatedNote;
        }
        return note;
      });
      setNotes(updatedNotes); // Actualizar el estado con la nota actualizada
    })
    .catch(error => console.error('Error updating note:', error));
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      fetchNotes(); // Recargar las notas después de eliminar
    })
    .catch(error => console.error('Error deleting note:', error));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Create Note</h1>
      <NoteForm addNote={addNote} />
      <h1>My Notes</h1>
      {notes.map(note => (
        <Note 
          key={note.id} 
          note={note} 
          deleteNote={deleteNote} 
          updateNote={updateNote}
        />
      ))}
    </div>
  );
  
}

export default NotesList;
