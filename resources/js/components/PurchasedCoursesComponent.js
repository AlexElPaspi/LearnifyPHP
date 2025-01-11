import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PurchasedCoursesComponent = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
                const response = await axios.get('/api/purchased-courses', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Respuesta recibida:', response.data); // Depuración: Verificar la respuesta

                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                } else {
                    console.error('La respuesta no es un array', response.data);
                    alert('Error al obtener los cursos comprados.');
                }
            } catch (error) {
                console.error('Error fetching purchased courses', error);
                alert('Error fetching purchased courses');
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className='w-full xl:p-10 flex flex-col justify-center text-gray-900 xl:space-y-10'>
            <div className='w-1/2 flex flex-col xl:space-y-1'>
                <h2 className='xl:text-4xl'>Mis Cursos Comprados</h2>
                <p className='xl:text-xl text-justify m-0'>Inicia, continúa o repite los cursos que has comprado.</p>
            </div>
            <div className='created-courses-nav flex justify-between'>
                <h2 className='xl:text-xl w-1/6 xl:p-3'>Todos los Cursos</h2>
                <input type="search" name="created-courses-searchbar" id="created-courses-searchbar" className='w-1/2 xl:p-3 border border-gray-500 xl:text-lg' placeholder='Buscar cursos...' />
                <p className='w-1/5 xl:p-3 border border-black xl:text-lg hover:bg-black hover:text-white'>Todos ^</p>
            </div>
            {courses.length > 0 ? (
                <div className='purchased-courses flex flex-wrap xl:gap-y-14 xl:gap-x-14'>
                    {courses.map((course) => (
                        <div key={course.id_course} className='purchased-course xl:w-96 xl:h-80 shadow-md shadow-gray-500'>
                            {course.logo && <img src={`/storage/courses/logos/${course.logo}`} className='xl:w-96 xl:h-40' alt={course.title} />}
                            <div className='purchased-course-info w-full xl:p-5 flex flex-col justify-center'>
                                <h3 className='xl:text-2xl'>{course.title}</h3>
                                <p className='xl:text-sm'>{course.user.first_name} {course.user.last_name}</p>
                                <Link to={`/purchased-courses/${course.id_course}`} className='w-full flex justify-center items-center xl:text-sm xl:px-1 xl:py-2 bg-gray-900 text-white hover:bg-gray-500'>Ver Curso</Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No has comprado ningún curso todavía.</p>
            )}
        </div>
    );
};

export default PurchasedCoursesComponent;
