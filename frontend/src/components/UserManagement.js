import React, {useState } from 'react';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

const UserManagement = () => {
    const [showCreateUser, setCreateUser] = useState(false); // Estado para controlar si se muestra UserManagement
    const [showEditUser, setEditUser] = useState(false); 

    const handleCreateClick = () => {
        setCreateUser(true); // Cambia el estado para mostrar el formulario de creación de usuario
        if(showEditUser) setEditUser(false);
    }

    const handleEditClick = () => {
        setEditUser(true); // Cambia el estado para mostrar el formulario de edición de usuario
        if(showCreateUser) setCreateUser(false);
    }

    return (
        <div>
            <h2>Users List</h2>
            {/* Renderizar la lista de usuarios */}
            {/* Botones para Crear, Editar y Eliminar usuarios */}
            <button onClick={handleCreateClick}>Create User</button>
            <button onClick={handleEditClick}>Edit User</button>
            <button>Eliminar Usuario</button>
            {showCreateUser && <CreateUser onExit={() => setCreateUser(false)} />} {/* Pasa una función para cambiar el estado y ocultar el formulario */}
            {showEditUser && <EditUser onExit={() => setEditUser(false)} />} {/* Pasa una función para cambiar el estado y ocultar el formulario */}
        </div>
    );
};

export default UserManagement;
