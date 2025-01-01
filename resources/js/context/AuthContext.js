import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configurar Axios para enviar cookies de sesión con las solicitudes API
axios.defaults.withCredentials = true;

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [nickname, setNickname] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Función para comprobar si el usuario está autenticado
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authResponse = await axios.get('/check-auth'); // Ruta para verificar la autenticación
                if (authResponse.data && authResponse.data.authenticated) {
                    setIsAuthenticated(authResponse.data.authenticated);
                    const nicknameResponse = await axios.get('/get-nickname'); // Ruta para obtener el nickname
                    if (nicknameResponse.data) {
                        setNickname(nicknameResponse.data.nickname); // Establecer el nickname
                    }
                } else {
                    setIsAuthenticated(false);
                    setNickname('');
                }
            } catch (error) {
                setIsAuthenticated(false);
                setNickname('');
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, nickname }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
