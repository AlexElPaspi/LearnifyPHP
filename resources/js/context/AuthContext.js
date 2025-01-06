import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configurar Axios para enviar cookies de sesión con las solicitudes API
axios.defaults.withCredentials = true;

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [nickname, setNickname] = useState('');
    const [photo, setPhoto] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            await axios.post('/logout'); // Ruta para cerrar sesión
            setIsAuthenticated(false);
            window.location.href = '/login'; // Redirigir a la página de inicio de sesión
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    // Función para comprobar si el usuario está autenticado
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authResponse = await axios.get('/check-auth'); // Ruta para verificar la autenticación
                if (authResponse.data && authResponse.data.authenticated) {
                    setIsAuthenticated(authResponse.data.authenticated);
                    const userResponse = await axios.get('/get-user'); // Ruta para obtener los datos del usuario
                    if (userResponse.data) {
                        setFirstName(userResponse.data.first_name);
                        setLastName(userResponse.data.last_name);
                        setBirthDate(userResponse.data.birth_date);
                        setNickname(userResponse.data.nickname); // Establecer el nickname
                        setPhoto(userResponse.data.photo); // Establecer la foto de perfil
                        setEmail(userResponse.data.email); // Establecer el correo electrónico
                    }
                } else {
                    setIsAuthenticated(false);
                    setFirstName('');
                    setLastName('');
                    setBirthDate('');
                    setNickname('');
                    setPhoto('');
                    setEmail('');
                }
            } catch (error) {
                setIsAuthenticated(false);
                setFirstName('');
                setLastName('');
                setBirthDate('');
                setNickname('');
                setPhoto('');
                setEmail('');
            } finally {
                setLoading(false); // Marcar como terminado el proceso de verificación
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, first_name, last_name, birth_date, nickname, photo, email, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
