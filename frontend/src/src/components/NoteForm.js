import React, { useState } from 'react';
import axios from '../axiosConfig'; // Asegúrate de importar correctamente axiosConfig

function NoteForm({ onNoteAdded }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [items, setItems] = useState(['']);
    const [images, setImages] = useState(['']);

    const handleAddItem = () => {
        setItems([...items, '']);
    };

    const handleItemChange = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const handleAddImage = () => {
        setImages([...images, '']);
    };

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/notes', {
                title,
                content,
                items: items.filter(item => item.trim() !== ''),
                images: images.filter(image => image.trim() !== '')
            });
            console.log('Note created:', response.data);
            onNoteAdded(response.data); // Llama a la callback con la nueva nota
            // Reset form after submission
            setTitle('');
            setContent('');
            setItems(['']);
            setImages(['']);
        } catch (error) {
            console.error('Error creating note:', error.response.data);
        }
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
