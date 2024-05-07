import axios from 'axios';

// Configurar la URL base de todas las llamadas AJAX a Axios
axios.defaults.baseURL = 'http://localhost:3000/api';

// Añadir un interceptor para incluir el token JWT en cada solicitud si está disponible
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
