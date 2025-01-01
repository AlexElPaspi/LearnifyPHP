// resources/js/components/NavBar.js
import React from 'react';

const NavBar = () => {
    return (
        <nav className="text-white flex justify-between sticky top-0 z-20">
            <a href="/" className='navbar-home flex'><img src="/images/logo-learnify.jpeg" alt="Learnify" className='w-20' /></a>
            <ul className="flex text-center justify-end xl:space-x-3 xl:text-lg xl:px-3 xl:py-7">
                <li><a href="/benefits" className="transition-all hover:transition-all hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Beneficios</a></li>
                <li><a href="/aboutus" className="transition-all hover:transition-all hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Sobre Nosotros</a></li>
                <li><a href="/contact" className="transition-all hover:transition-all hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Contacto</a></li>
                <li><a href="/register" className="transition-all hover:transition-all hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Registrarse</a></li>
                <li><a href="/login" className="transition-all hover:transition-all hover:bg-white hover:bg-opacity-50 hover:text-black xl:py-1 xl:px-3 rounded">Iniciar Sesión</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;
