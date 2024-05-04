// Note.js
import React, { useState } from 'react';
import '../styles/Note.css';


// Definimos el componente Note que recibe props para manipular y visualizar una nota
function Note({ note, deleteNote, updateNote }) {
  // Estado que indica si la nota está en modo de edición
  const [isEditing, setIsEditing] = useState(false);
  // Estado que almacena los detalles de la nota que está siendo editada
  const [editedNote, setEditedNote] = useState({ ...note });

  // Función para habilitar el modo de edición
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Función para cancelar la edición y restaurar los datos originales de la nota
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedNote({ ...note });
  };

  // Función para guardar las ediciones hechas a la nota y desactivar el modo de edición
  const handleSaveEdit = () => {
    updateNote(note.id, editedNote);
    setIsEditing(false);
  };

  // Función para manejar cambios en los campos de entrada de la nota durante la edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote({
      ...editedNote,
      [name]: value,
    });
  };

  // Función para manejar cambios en los ítems de la lista de la nota
  const handleChangeListItem = (index, value) => {
    const newItems = editedNote.items ? [...editedNote.items] : [];
    newItems[index] = value;
    setEditedNote({
      ...editedNote,
      items: newItems,
    });
  };

  // Función para manejar cambios en las URLs de imágenes asociadas con la nota
  const handleChangeImageUrl = (index, value) => {
    const newImages = editedNote.images ? [...editedNote.images] : [];
    newImages[index] = value;
    setEditedNote({
      ...editedNote,
      images: newImages,
    });
  };

  return (
    <div className="note-container">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            className="note-title"
          />
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            className="note-content"
          />
          {editedNote.items && editedNote.items.map((item, index) => (
            <input
              key={index}
              type="text"
              name="items"
              value={item}
              onChange={(e) => handleChangeListItem(index, e.target.value)}
              className="note-items"
            />
          ))}
          <button onClick={() => handleChangeListItem(editedNote.items ? editedNote.items.length : 0, '')} className="note-button">
            Añadir Item
          </button>
          {editedNote.images && editedNote.images.map((url, index) => (
            <input
              key={index}
              type="text"
              name="images"
              value={url}
              onChange={(e) => handleChangeImageUrl(index, e.target.value)}
              className="note-items"
            />
          ))}
          <button onClick={() => handleChangeImageUrl(editedNote.images ? editedNote.images.length : 0, '')} className="note-button">
            Añadir Imagen
          </button>
          <button onClick={handleSaveEdit} className="note-button">
            Guardar
          </button>
          <button onClick={handleCancelEdit} className="note-button">
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <h2 className="note-title">{note.title}</h2>
          <p className="note-content">{note.content}</p>
          {note.items && note.items.map((item, index) => (
            <li key={index} className="note-item">{item}</li>
          ))}
          {note.images && note.images.map((url, index) => (
            <img key={index} src={url} alt="Note" className="note-image" />
          ))}
          <button onClick={handleEditClick} className="note-button">
            Editar
          </button>
          <button onClick={() => deleteNote(note.id)} className="note-button">
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
