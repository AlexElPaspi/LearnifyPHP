import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreatedCoursesComponent = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/created-courses', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('api_token')}`, // Asegúrate de que el token se envía con la solicitud
                    }
                });
                console.log(response.data); // Verificar la respuesta de la API
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };

        fetchCourses();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-course/${id}`);
    }

    const handleAddContent = (id) => {
        navigate(`/add-content/${id}`);
    }

    return (
        <div className="w-full xl:p-10 flex flex-col justify-center text-gray-900 xl:space-y-10">
            <div className='w-1/2 flex flex-col xl:space-y-1'>
                <h2 className='xl:text-4xl'>Mis Cursos Creados</h2>
                <p className='xl:text-xl text-justify m-0'>Comparte tus conocimientos y genera ingresos creando un nuevo curso. O edita uno ya existente.</p>
            </div>
            <div className='created-courses-nav flex justify-between'>
                <h2 className='xl:text-xl w-1/6 xl:p-3'>Todos los Cursos</h2>
                <input type="search" name="created-courses-searchbar" id="created-courses-searchbar" className='w-1/2 xl:p-3 border border-gray-500 xl:text-lg' placeholder='Buscar cursos...' />
                <Link to='/create-course' className='w-1/5 xl:p-3 border border-black xl:text-lg hover:bg-black hover:text-white'>Crear nuevo curso +</Link>
            </div>
            {courses.length > 0 ? (
                <div className="created-courses flex flex-wrap xl:gap-y-14 xl:gap-x-14">
                    {courses.map((course) => (
                        <div className="created-course xl:w-96 xl:h-80 shadow-md shadow-gray-500" key={course.id_course}>
                            {course.logo && <img src={`/storage/courses/logos/${course.logo}`} className="xl:w-full xl:h-1/2" alt={course.title} />}
                            <div className="created-course-info w-full h-1/2 xl:p-5 flex flex-col justify-between">
                                <h5 className="card-title">{course.title}</h5>
                                <div className="w-full flex xl:space-x-3">
                                    <button className='xl:text-sm w-1/2 bg-gray-900 text-white hover:bg-gray-500 xl:px-4 py-2' onClick={() => handleEdit(course.id_course)}>Editar Curso</button>
                                    <button className='xl:text-sm w-1/2 bg-blue-600 text-white hover:bg-blue-700 xl:px-4 py-2' onClick={() => handleAddContent(course.id_course)}>Ver Clases</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No has creado ningún curso todavía.</p>
            )}
        </div>
    );
};

export default CreatedCoursesComponent;
