// resources/js/components/NavBar.js
import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-blue-500 text-white xl:px-3 xl:py-7">
            <ul className="flex text-center justify-end xl:space-x-3 xl:text-lg">
                <li><a href="/benefits" className="hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Beneficios</a></li>
                <li><a href="/aboutus" className="hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Sobre Nosotros</a></li>
                <li><a href="/contact" className="hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Contacto</a></li>
                <li><a href="/register" className="hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Registrarse</a></li>
                <li><a href="/login" className="hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Iniciar Sesión</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;
