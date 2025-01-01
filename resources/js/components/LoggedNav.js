import React from 'react';
import { useAuth } from '../context/AuthContext';

const LoggedNav = () => {
    const { nickname } = useAuth();

    return (
        <nav className="text-white flex flex-col justify-between sticky top-0 z-20">
            <div className="loggednavup flex justify-between items-center">
                <img src="/images/logo-learnify.jpeg" alt="Learnify" className='w-20' />
                <input type="search" className='w-1/2 h-fit xl:p-2 xl:text-base text-black xl:rounded-lg' name="search_course" id="search_course" placeholder='¿Qué te interesa aprender hoy?' />
                <div className="ml-4 text-black">{nickname}</div> {/* Mostrar el nickname */}
            </div>
            <div className="loggednavdown w-full bg-blue-200">
                <ul className="flex text-center text-gray-500 xl:text-base xl:py-3">
                    <li><a href="/home" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Inicio</a></li>
                    <li><a href="/aboutus" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Cursos</a></li>
                    <li><a href="/contact" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Categorías</a></li>
                    <li><a href="/register" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Cursos Comprados</a></li>
                    <li><a href="/login" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Cursos Creados</a></li>
                    <li><a href="/login" className="transition-all hover:transition-all hover:text-black xl:px-4">Comunidad</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default LoggedNav;
