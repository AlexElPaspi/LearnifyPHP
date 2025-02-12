require('./bootstrap');
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavBar from './components/NavBar.js';
import LoggedNav from './components/LoggedNav.js';
import HomeComponent from './components/HomeComponent.js';
import WelcomeComponent from './components/WelcomeComponent.js';
import LoginComponent from './components/LoginComponent.js';
import RegisterComponent from './components/RegisterComponent.js';
import Footer from './components/Footer.js';
import ProfileComponent from './components/ProfileComponent.js';
import CreateCourseComponent from './components/CreateCourseComponent.js';
import CreatedCoursesComponent from './components/CreatedCoursesComponent.js';
import EditCourseComponent from './components/EditCourseComponent.js';
import axios from 'axios';
import CoursesComponent from './components/CoursesComponent.js';
import CourseDetailComponent from './components/CourseDetailComponent.js';
import PurchasedCoursesComponent from './components/PurchasedCoursesComponent.js';
import PurchasedCourseDetailComponent from './components/PurchasedCourseDetailComponent.js';
import AddCourseContentComponent from './components/AddCourseContentComponent.js';
import ShowContentComponent from './components/CreatedContentComponent.js';
import EditContentComponent from './components/EditContentComponent.js';

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
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

const AppContent = () => {
    const { loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Puedes personalizar el componente de carga según tus necesidades
    }

    // Páginas donde se debe cargar `LoggedNav`
    const loggedInRoutes = ['/home', '/profile', '/courses', '/create-course', '/created-courses', '/edit-course/:id', '/purchased-courses', '/add-content', '/created-content', '/edit-content'];

    // Verificar si la ruta actual coincide con alguna de las rutas que requieren LoggedNav
    const showLoggedNav = loggedInRoutes.some(route => new RegExp(route.replace(':id', '\\d+')).test(location.pathname));

    return (
        <div>
            {showLoggedNav ? <LoggedNav /> : <NavBar />}
            <Routes>
                <Route path="/" element={<WelcomeComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/profile" element={<ProfileComponent />} />
                <Route path="/courses" element={<CoursesComponent />} />
                <Route path="/courses/:id" element={<CourseDetailComponent />} />
                <Route path="/create-course" element={<CreateCourseComponent />} />
                <Route path="/created-courses" element={<CreatedCoursesComponent />} />
                <Route path="/add-content/:id" element={<AddCourseContentComponent />} />
                <Route path="/created-content/:id" element={<ShowContentComponent />} />
                <Route path="/edit-course/:id" element={<EditCourseComponent />} />
                <Route path="/edit-content/:id" element={<EditContentComponent />} />
                <Route path="/purchased-courses" element={<PurchasedCoursesComponent />} />
                <Route path="/purchased-courses/:id" element={<PurchasedCourseDetailComponent />} />
            </Routes>
            <Footer />
        </div>
    );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
