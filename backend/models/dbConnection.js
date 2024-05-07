const mongoose = require('mongoose');

class DBConnection {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect('mongodb+srv://DSW:12345@cluster0.lbjtfnd.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        // También puedes proporcionar otras opciones de configuración aquí si es necesario
      });
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
    }
  }

  async createUser(userData) {
    try {
      // Crear un nuevo usuario en la base de datos
      const newUser = await User.create(userData);
      console.log('User created:', newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(userId, newData) {
    try {
      // Actualizar los datos de un usuario existente en la base de datos
      const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
      console.log('User updated:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      // Eliminar un usuario de la base de datos
      const deletedUser = await User.findByIdAndDelete(userId);
      console.log('User deleted:', deletedUser);
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async getUser(username, password) {
    try {
      // Obtener los datos de un usuario por su nombre de usuario y contraseña
      const user = await User.findOne({ username: username, password: password });
      console.log('User found:', user);
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      // Obtener todos los usuarios de la base de datos
      const users = await User.find();
      console.log('All users:', users);
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }
}

module.exports = new DBConnection();
