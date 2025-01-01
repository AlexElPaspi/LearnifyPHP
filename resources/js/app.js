require('./bootstrap');
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavBar from './components/NavBar.js';
import LoggedNav from './components/LoggedNav.js';
import HomeComponent from './components/HomeComponent.js';
import WelcomeComponent from './components/WelcomeComponent.js';
import LoginComponent from './components/LoginComponent.js';
import RegisterComponent from './components/RegisterComponent.js';
import Footer from './components/Footer.js';
import axios from 'axios';

// Configurar Axios para enviar cookies de sesión y CSRF token con las solicitudes API
axios.defaults.withCredentials = true;

// Agregar un interceptor para configurar el token CSRF en cada solicitud
axios.interceptors.request.use(config => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    if (token) {
        config.headers['X-CSRF-TOKEN'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function App() {
    return (
        <AuthProvider>
            <Router>
                <YourAppContent />
            </Router>
        </AuthProvider>
    );
}

const YourAppContent = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // Páginas donde se debe cargar `LoggedNav`
    const loggedInRoutes = ['/home'];

    return (
        <div>
            {/* Condicional para mostrar LoggedNav o NavBar según la ruta */}
            {loggedInRoutes.includes(location.pathname) ? <LoggedNav /> : <NavBar />}
            <Routes>
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/" element={<WelcomeComponent />} />
            </Routes>
            <Footer />
        </div>
    );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
