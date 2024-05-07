const DBConnection = require('./dbConnection');

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Obtener los datos del usuario desde la base de datos
    const user = await DBConnection.getUser(username, password);

    if (!user) {
      // Si el usuario no existe, enviar un mensaje de error
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Si las credenciales son válidas, enviar una respuesta exitosa
    res.status(200).json({ message: 'Login successful', username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
