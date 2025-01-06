import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatedCoursesComponent = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const { first_name, last_name } = useAuth();

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

    return (
        <div className="container">
            <h1 className='xl:text-4xl xl:p-10'>Cursos creados por {first_name} {last_name}</h1>
            {courses.length > 0 ? (
                <div className="my-courses xl:px-10 xl:pb-10">
                    {courses.map((course) => (
                        <div className="w-1/4" key={course.id_course}>
                            <div className="w-full border overflow-hidden xl:rounded-xl">
                                {course.logo && <img src={`/storage/courses/logos/${course.logo}`} className="card-img-top" alt={course.title} />}
                                <div className="course-info xl:p-5">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <button className='bg-yellow-500 text-white xl:px-4 py-2' onClick={() => handleEdit(course.id_course)}>Editar</button>
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
