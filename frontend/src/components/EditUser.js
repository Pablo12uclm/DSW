import React, { useState } from 'react';

const EditUser = ({ onExit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSaveClick = () => {
        // Aquí puedes agregar la lógica para guardar el usuario editado
        onExit(); // Llama a la función onExit pasada como prop para ocultar el formulario
    }

    const handleCancelClick = () => {
        // Aquí puedes agregar la lógica para cancelar la edición de usuario
        onExit(); // Llama a la función onExit pasada como prop para ocultar el formulario
    }

    return (
        <div>
            <h2>Edit User</h2>
            {/* Inputs para el nombre de usuario y contraseña */}
            <input
                type="text"
                placeholder="New Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {/* Botones para guardar y cancelar */}
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
        </div>
    );
};

export default EditUser;
