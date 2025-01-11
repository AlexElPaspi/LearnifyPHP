import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetailComponent = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course', error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubscribe = async () => {
        try {
            const response = await axios.post(`/api/courses/${id}/subscribe`);
            alert(response.data.message || 'Te has inscrito exitosamente en el curso.');
            if (response.status === 200) {
                navigate(`/courses/${id}`);
            }
        } catch (error) {
            const message = error.response?.data?.message;
            if (message) {
                alert(message);
            } else {
                alert('Se ha producido un error al intentar suscribirse al curso.');
            }
        }
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex flex-col justify-center text-gray-900">
            <div className='xl:p-10 flex flex-col justify-center xl:space-y-1'>
                <h2 className='xl:text-4xl'>{course.title}</h2>
                <p className="xl:text-xl text-justify m-0">{course.description}</p>
            </div>
            <div className='xl:p-10 bg-blue-200 flex flex-col justify-center'>
                <h2 className='xl:text-3xl'>Información sobre el curso</h2>
            </div>
            <div className='xl:p-10 text-gray-900 flex flex-col justify-center items-center xl:space-y-10'>
                <h2 className="xl:text-3xl self-start">¡Conoce al creador del curso!</h2>
                <div className='xl:p-10 flex items-center shadow-md shadow-gray-500 w-9/12 xl:space-x-10'>
                    {course.user.photo && <img src={`/storage/images/${course.user.photo}`} alt={course.user.first_name} className="w-1/4 rounded-full" />}
                    <div className='xl:space-y-1'>
                        <p className='xl:text-4xl'>{course.user.first_name} {course.user.last_name}</p>
                        <p className='xl:text-lg'>{course.user.bio}</p>
                    </div>
                </div>
            </div>
            <div className='bg-learnify xl:p-10 flex flex-col justify-center items-center'>
                <h2 className='xl:text-3xl text-white self-start'>Clases del curso</h2>
                <button onClick={handleSubscribe} className='hover-learnify shadow-md shadow-black xl:text-3xl bg-white xl:p-3 hover:text-white xl:rounded-xl'>¡Compra el curso ahora mismo!</button>
            </div>
            <div className='xl:p-10 bg-blue-200 flex flex-col justify-center'>
                <h2 className='xl:text-3xl'>Mira las experiencias de otros aprendices en el curso</h2>
            </div>
            <div className='xl:p-10 flex flex-col justify-center items-center'>
                <button onClick={handleSubscribe} className='shadow-md shadow-black xl:text-3xl bg-learnify text-white xl:p-3 hover:text-gray-900 hover:bg-none xl:rounded-xl'>¡Empieza a aprender!</button>
            </div>
        </div>
    );
};

export default CourseDetailComponent;
