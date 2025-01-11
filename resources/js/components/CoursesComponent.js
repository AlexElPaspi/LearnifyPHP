import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CoursesComponent = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="">
            <div className="w-1/2 xl:p-10 flex flex-col justify-center text-gray-900 xl:space-y-3">
                <h2 className="xl:text-4xl">Explora Nuestros Cursos</h2>
                <p className="xl:text-xl text-justify m-0">Descubre una amplia variedad de cursos impartidos por expertos en sus campos.</p>
            </div>
            <div>
                <h2 className='bg-learnify xl:p-4 text-white xl:text-xl'>Todos los Cursos</h2>
            </div>
            <div className="courses xl:p-10 flex flex-wrap xl:gap-y-14 xl:gap-x-14">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div className="course xl:w-96 xl:h-80 shadow-md shadow-gray-500" key={course.id_course}>
                            {course.logo && <img src={`/storage/courses/logos/${course.logo}`} className="xl:w-96 xl:h-1/2" alt={course.title} />}
                            <div className="xl:p-5 xl:space-y-3 h-1/2 flex flex-col justify-between">
                                <div>
                                    <h5 className="xl:text-2xl">{course.title}</h5>
                                    <p className="xl:text-sm">{course.user.first_name} {course.user.last_name}</p>
                                </div>
                                <div className='xl:space-y-1'>
                                    <div className='flex xl:space-x-1'>
                                        <p className='xl:text-sm'>4.8</p>
                                        <p className='xl:text-sm'>15.000</p>
                                        <p className='xl:text-sm'>8 Semanas</p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-gray-900 xl:text-xl'>$500.000 COP</p>                                    
                                        <p><Link to={`/courses/${course.id_course}`} className="xl:text-sm text-white bg-gray-900 xl:px-1 xl:py-2 hover:bg-blue-500">Más Información</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay cursos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default CoursesComponent;
