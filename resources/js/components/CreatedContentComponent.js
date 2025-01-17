import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const CreatedContentComponent = () => {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/created-courses', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
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

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axios.get(`/api/courses/${id}/contents`);
                setContents(response.data);
            } catch (error) {
                console.error('Error fetching course contents', error);
            }
        };

        fetchContents();
    }, [id]);

    const handleEditContent = (contentId) => {
        navigate(`/edit-content/${contentId}`); // Redirigir a la página de edición de contenido
    };

    const handleAddContent = () => {
        navigate(`/add-content/${id}`);
    };

    // Función para convertir las URLs de YouTube (watch a embed)
    const convertYoutubeUrl = (url) => {
        const embedPrefix = "https://www.youtube.com/embed/";
        const searchParams = "?rel=0&amp;showinfo=0;autoplay=1;fs=1;modestbranding=1;cc_load_policy=1;iv_load_policy=3;";
        let videoID = "";

        if (url.includes("watch?v=")) {
            videoID = url.split("watch?v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoID = url.split("youtu.be/")[1];
        } else if (url.includes("/embed/")) {
            return url; // Si ya tiene el formato correcto, solo devolvemos la URL
        } else {
            videoID = url.split("/").pop();
        }

        return `${embedPrefix}${videoID}${searchParams}`;
    };

    return (
        <div className="w-full xl:p-10 flex flex-col justify-center text-gray-900 xl:space-y-10">
            <div className='created-courses-nav flex justify-between'>
                <h2 className='xl:text-xl w-1/6 xl:p-3'>Clases del Curso</h2>
                <input type="search" name="created-courses-searchbar" id="created-courses-searchbar" className='w-1/2 xl:p-3 border border-gray-500 xl:text-lg' placeholder='Buscar clases...' />
                <button onClick={handleAddContent} className='w-1/5 xl:p-3 border border-black xl:text-lg hover:bg-black hover:text-white'>Crear nueva clase +</button>
            </div>
            <div className="classes-list flex flex-wrap xl:gap-y-14 xl:gap-x-14">
                {contents.length === 0 ? (
                    <p className="xl:text-lg">No hay ninguna clase disponible.</p>
                ) : (
                    contents.map((content, index) => (
                        <div key={content.id_class} className="xl:space-y-5 w-full flex flex-col justify-center items-center bg-gray-200 rounded-xl overflow-hidden">
                            <div className='flex justify-between items-center'>
                                <h3 className="xl:text-xl xl:pl-10">{index + 1}. {content.title}</h3>
                                {content.banner && (
                                    <img src={`/storage/${content.banner}`} alt="Course Banner" className='w-1/4 rounded-xl border-2 border-black' />
                                )}
                            </div>
                            <div className="xl:p-10 flex flex-col w-full justify-between xl:space-y-5 items-center">
                                <p className="xl:text-base self-start">{content.description}</p>
                                <iframe
                                    className='w-3/4 h-96 rounded-xl'
                                    src={convertYoutubeUrl(content.video_url)}
                                    title={`Class ${index + 1}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                                {content.pdf_path && (
                                    <a href={`/storage/${content.pdf_path}`} target="_blank" rel="noopener noreferrer" className="text-red-500 bg-gray-300 xl:px-3 xl:py-1 rounded hover:text-white hover:bg-red-500 hover:underline ml-4">Ver PDF</a>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CreatedContentComponent;
