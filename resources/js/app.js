require('./bootstrap');
import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './components/NavBar.js';
import HomeComponent from './components/HomeComponent.js';
import WelcomeComponent from './components/WelcomeComponent.js';
import LoginComponent from './components/LoginComponent.js';
import RegisterComponent from './components/RegisterComponent.js';

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

function App() {
    const path = window.location.pathname;

    let Component;
    switch (path) {
        case '/home':
            Component = HomeComponent;
            break;
        case '/login':
            Component = LoginComponent;
            break;
        case '/register':
            Component = RegisterComponent;
            break;
        default: // Cuando la ruta es "/" (Usuario no loggeado)
            Component = WelcomeComponent;
            break;
    }  

    return (
        <div>
            <NavBar />
            <Component />
        </div>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);