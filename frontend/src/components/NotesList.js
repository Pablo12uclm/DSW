import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';  // Asegúrate de importar tu configuración personalizada de Axios
import Note from './Note';
import NoteForm from './NoteForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import '../styles/App.css';

function NotesList() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    axios.get('/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  };

  const handleNoteAdded = (newNote) => {
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  const addNote = (note) => {
    axios.post('/notes', note)
      .then(response => {
        console.log('Note added successfully:', response.data);
        // Asegurarse de que la respuesta del servidor contiene los datos correctos
        if (response.data && response.status === 201) {
          // Método 1: Agregar la nueva nota al estado
          setNotes(prevNotes => [...prevNotes, response.data]);
        } else {
          throw new Error('Invalid server response');
        }
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };
  

  const updateNote = (id, updatedNote) => {
    axios.put(`/notes/${id}`, updatedNote)
    .then(response => {
        console.log("Respuesta después de actualizar:", response.data);
        // Aquí actualizamos el estado con la nota actualizada
        setNotes(prevNotes => prevNotes.map(note => note._id === id ? { ...note, ...response.data } : note));
    })
    .catch(error => {
        console.error('Error al actualizar la nota:', error);
    });
  };

  const deleteNote = (id) => {
    axios.delete(`/notes/${id}`)
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
      <div className="user-management-link">
        <Link to="/manage-users"><FontAwesomeIcon icon={faUserCog} /> Gestión de Usuarios</Link>
      </div>
      <h1>Create Note</h1>
      <NoteForm addNote={addNote} onNoteAdded={handleNoteAdded} />
      <h1>My Notes</h1>
      {notes.map(note => (
        <Note
          key={note._id}
          note={note}
          deleteNote={() => deleteNote(note._id)}
          updateNote={updateNote}
        />
      ))}
    </div>
  );
}

export default NotesList;
