import React from 'react';
import { useAuth } from '../context/AuthContext';

const LoggedNav = () => {
    const { nickname, photo } = useAuth();

    return (
        <nav className="text-white flex flex-col justify-between sticky top-0 z-20">
            <div className="loggednavup flex justify-between items-center">
                <img src="/images/logo-learnify.jpeg" alt="Learnify" className='xl:w-24' />
                <input type="search" className='w-1/2 h-fit xl:p-2 xl:text-base text-black xl:rounded-lg' name="search_course" id="search_course" placeholder='¿Qué te interesa aprender hoy?' />
                <a href="/profile">
                    <div className="user flex justify-between items-center xl:space-x-3 xl:text-lg xl:p-4 cursor-pointer hover:bg-white hover:bg-opacity-50 hover:text-black">
                        <div className='nickname'>{nickname}</div>
                        <img src={photo ? `/storage/images/${photo}` : '/images/placeholder-profile.png'} alt="Profile Photo" className='xl:w-16 xl:h-16 rounded-full' /> {/* Mostrar la foto de perfil o un placeholder */}
                    </div>
                </a>
            </div>
            <div className="loggednavdown w-full bg-blue-200">
                <ul className="flex text-center text-gray-500 xl:text-base xl:py-3">
                    <li><a href="/home" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Inicio</a></li>
                    <li><a href="/courses" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Cursos</a></li>
                    <li><a href="/contact" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Categorías</a></li>
                    <li><a href="/register" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Cursos Comprados</a></li>
                    <li><a href="/created-courses" className="border-r-2 border-gray-500 transition-all hover:transition-all hover:text-black xl:px-4">Cursos Creados</a></li>
                    <li><a href="/login" className="transition-all hover:transition-all hover:text-black xl:px-4">Comunidad</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default LoggedNav;
