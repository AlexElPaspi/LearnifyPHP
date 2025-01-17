import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CourseDetailComponent = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]); // Estado para los contenidos
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/api/courses/${id}`);
                setCourse(response.data);
                setContents(response.data.contents || []); // Establecer los contenidos
            } catch (error) {
                console.error('Error fetching course', error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubscribe = async () => {
        try {
            const response = await axios.post(`/api/courses/${id}/subscribe`);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Te has inscrito exitosamente al curso.',
            });            
            navigate(`/purchased-courses/${id}`);
        } catch (error) {
            const message = error.response?.data?.message;
            if (message) {
                alert(message);
            } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Se ha producido un error al intentar suscribirse al curso.',
            });            
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
                <div className='flex overflow-x-auto xl:py-10 xl:mb-10 space-x-10 w-full scroll-container'>
                    {contents.length === 0 ? (
                        <p className="xl:text-lg">No hay ninguna clase disponible.</p>
                    ) : (
                        contents.map((content, index) => ( 
                            <div key={content.id_class} className="relative space-y-0 min-w-80 max-w-80 min-h-96 max-h-96 flex flex-col justify-between bg-white shadow-md shadow-black">
                                <div className='absolute flex self-end translate-x-1/2 -translate-y-1/2 justify-center items-center xl:text-lg bg-blue-200 w-fit xl:p-5 rounded-full'>#{index + 1}</div>
                                {content.banner && ( <img src={`/storage/${content.banner}`} alt="Course Banner" className='w-full' /> )}
                                <div className='w-full h-1/2 flex flex-col items-start xl:p-5 xl:space-y-1 overflow-hidden'>
                                    <h3 className="xl:text-xl self-start">{content.title}</h3>
                                    <p className="xl:text-base xl:text-justify self-start w-full overflow-hidden">{content.description}</p>
                                </div>
                            </div> 
                        ))
                    )}
                </div>
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
