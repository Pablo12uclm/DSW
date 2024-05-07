import React, { useState } from 'react';

const SignUp = ({ onSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = () => {
        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            setError('P');
            return;
        }

        // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
        // Por ejemplo, llamando a una función onSignUp y pasándole los datos del formulario
        onSignUp({ username, password });

        // Limpiar los campos del formulario después de enviar los datos
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div>
            <h2>SignUp</h2>
            {/* Input para el nombre de usuario */}
            <input
                type="text"
                placeholder="User"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {/* Input para la contraseña */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {/* Input para repetir la contraseña */}
            <input
                type="password"
                placeholder="Repeat Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Botón para registrarse */}
            <button onClick={handleSignUp}>SignUp</button>
            {/* Mostrar mensaje de error si existe */}
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignUp;
