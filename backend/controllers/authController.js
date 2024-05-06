// authController.js

// Definir la base de datos de usuarios
const usersDB = [
    { username: 'admin', password: '12345' },
    { username: 'usuario', password: '54321' },
    { username: 'usuario2', password: '15243' }
  ];
  
  // Controlador para el inicio de sesión
  exports.login = (req, res) => {
    const { username, password } = req.body;
  
    // Verificar si el usuario existe en la base de datos
    const user = usersDB.find(user => user.username === username);
  
    if (!user) {
      // Si el usuario no existe, enviar un mensaje de error
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  
    // Verificar la contraseña del usuario
    if (user.password !== password) {
      // Si la contraseña es incorrecta, enviar un mensaje de error
      return res.status(401).json({ error: 'Invalid password' });
    }
  
    // Si las credenciales son válidas, enviar una respuesta exitosa
    res.status(200).json({ message: 'Login successful', username: user.username });
  };
  