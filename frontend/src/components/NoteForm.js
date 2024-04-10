import React, { useState } from 'react';
import '../styles/App.css';

function NoteForm({ addNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [items, setItems] = useState(['']);
  const [images, setImages] = useState(['']);

  // Función para manejar la adición de un nuevo ítem de lista
  const handleAddItem = () => {
    setItems([...items, '']);
  };

  // Función para manejar el cambio en los ítems de lista
  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  // Función para manejar la adición de una nueva URL de imagen
  const handleAddImage = () => {
    setImages([...images, '']);
  };

  // Función para manejar el cambio en las URLs de imagen
  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      title,
      content,
      items: items.filter(item => item.trim() !== ''), // Filtrar ítems vacíos
      images: images.filter(image => image.trim() !== ''), // Filtrar URLs vacías
    });

    // Resetear el formulario
    setTitle('');
    setContent('');
    setItems(['']);
    setImages(['']);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
        required
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-input"
        required
      />
      {items.map((item, index) => (
        <input
          key={index}
          type="text"
          placeholder="Ítem de lista"
          value={item}
          onChange={(e) => handleItemChange(index, e.target.value)}
          className="form-input"
        />
      ))}
      <button type="button" onClick={handleAddItem} className="form-button">Agregar Ítem</button>
      {images.map((image, index) => (
        <input
          key={index}
          type="text"
          placeholder="URL de imagen"
          value={image}
          onChange={(e) => handleImageChange(index, e.target.value)}
          className="form-input"
        />
      ))}
      <button type="button" onClick={handleAddImage} className="form-button">Agregar Imagen</button>
      <button type="submit" className="form-button">Guardar Nota</button>
    </form>
  );
}

export default NoteForm;
