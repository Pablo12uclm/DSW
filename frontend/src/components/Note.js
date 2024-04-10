// Note.js
import React, { useState } from 'react';
import '../styles/Note.css';

function Note({ note, deleteNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedNote({ ...note });
  };

  const handleSaveEdit = () => {
    updateNote(note.id, editedNote);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote({
      ...editedNote,
      [name]: value,
    });
  };

  const handleChangeListItem = (index, value) => {
    const newItems = editedNote.items ? [...editedNote.items] : [];
    newItems[index] = value;
    setEditedNote({
      ...editedNote,
      items: newItems,
    });
  };

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
