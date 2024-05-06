import React, { useEffect, useState } from 'react';
import Note from './Note'; // Asegúrate de tener este componente
import NoteForm from './NoteForm'; // Asegúrate de tener este componente
import '../styles/App.css'
import UserManagement from './UserManagement';


function NotesList({ isAdminLoggedIn}) {
  const [showUserManagement, setShowUserManagement] = useState(false); // Estado para controlar si se muestra UserManagement

  const handleUserManagementClick = () => {
    setShowUserManagement(!showUserManagement);
  }
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
        body: JSON.stringify(updatedNote)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta después de actualizar:", data);
        // Aquí actualizamos el estado con la nota actualizada
        setNotes(prevNotes => prevNotes.map(note => note._id === id ? { ...note, ...data } : note));
    })
    .catch(error => {
        console.error('Error al actualizar la nota:', error);
    });
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
      <div id='UserManagement'>
        {isAdminLoggedIn && <button onClick={handleUserManagementClick}>Users Management</button>}
        {showUserManagement && <UserManagement />}
      </div>
      {!showUserManagement && (
        <div id='Notes'>
          <h1>Create Note</h1>
            <NoteForm addNote={addNote} />
          <h1>My Notes</h1>
          {notes.map(note => (
            <Note 
              key={note._id}
              note={note} 
              deleteNote={() => deleteNote(note._id)} // Cambio aquí
              updateNote={updateNote} // Pasar directamente la referencia de la función
              />
          ))}
      </div>
      )}
    </div>
  );
  
}

export default NotesList;
