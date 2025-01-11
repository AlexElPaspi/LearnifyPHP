import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PurchasedCourseDetailComponent = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/purchased-courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCourse(response.data);
                setContents(response.data.contents || []);
            } catch (error) {
                console.error('Error fetching purchased course', error);
                alert('Error fetching purchased course');
            }
        };

        fetchCourse();
    }, [id]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex flex-col justify-center text-gray-900">
            <div className="xl:p-10 flex flex-col justify-center xl:space-y-1">
                <h1 className="xl:text-4xl">{course.title}</h1>
                <p className="xl:text-xl text-justify m-0">{course.description}</p>
            </div>
            <div className="xl:p-10 bg-learnify flex flex-col justify-center">
                <h2 className="xl:text-3xl text-white">Clases del Curso</h2>
                {contents.length === 0 ? (
                    <p className="xl:text-lg">No hay ninguna clase disponible.</p>
                ) : (
                    contents.map((content, index) => (
                        <div key={content.id_class} className="xl:py-4">
                            <h3 className="xl:text-xl">{index + 1}. {content.title}</h3>
                            <p className="xl:text-base">{content.description}</p>
                            <a href={content.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver Video</a>
                            {content.pdf_path && (
                                <a href={`/storage/${content.pdf_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-4">Ver PDF</a>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div className="xl:p-10 text-gray-900 flex flex-col justify-center items-center xl:space-y-10">
                <h2 className="xl:text-3xl self-start">Instructor</h2>
                <div className="xl:p-10 flex items-center shadow-md shadow-gray-500 w-9/12 xl:space-x-10">
                    {course.user && course.user.photo && (
                        <img
                            src={`/storage/images/${course.user.photo}`}
                            alt={course.user.first_name}
                            className="w-1/4 rounded-full"
                        />
                    )}
                    <div className="xl:space-y-1">
                        {course.user && (
                            <>
                                <p className="xl:text-4xl">{course.user.first_name} {course.user.last_name}</p>
                                <p className="xl:text-lg">{course.user.bio}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasedCourseDetailComponent;
