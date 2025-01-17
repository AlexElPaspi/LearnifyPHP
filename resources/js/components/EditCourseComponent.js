import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DropZone from './DropZone';
import Swal from 'sweetalert2';

const EditCourseComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState(null);
    const [currentLogo, setCurrentLogo] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/api/courses/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    }
                });
                const course = response.data;
                setTitle(course.title);
                setDescription(course.description);
                setCurrentLogo(course.logo);
            } catch (error) {
                console.error('Error fetching course', error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (logo) {
            formData.append('logo', logo);
        }

        try {
            const response = await axios.post(`/update-course/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'El curso se ha actualizado satisfactoriamente.',
            });
            window.location.reload();
        } catch (error) {
            console.error('Error updating course', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Se ha producido un error al actualizar el curso.',
            });        
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setLogo(event.target.files[0]);
        }
    };

    const handleFileSelect = (file) => {
        setLogo(file);
    };

    return (
        <div className='xl:py-10 flex justify-center items-center'>
            <div className="bg-gray-100 flex flex-col justify-center items-center w-2/3 xl:p-10 shadow-sm shadow-black xl:rounded-xl">
                <h2>Editar Curso</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className='xl:space-y-10 w-full'>
                    <div className="flex flex-col">
                        <label htmlFor="logo" className="form-label">Logo del Curso (Opcional):</label>
                        <div className='flex justify-center'>
                            <DropZone dropzoneClass='absolute xl:w-64 h-32 text-white opacity-0 border border-2 border-dashed border-white border flex justify-center items-center cursor-pointer hover:bg-black hover:opacity-70 xl:text-base overflow-hidden xl:rounded-xl' onFileSelect={handleFileSelect} />
                            {currentLogo && <img src={`/storage/courses/logos/${currentLogo}`} alt="Current Logo" className="flex justify-center xl:w-64 h-32 xl:rounded-xl" />}
                        </div>
                    </div>
                    <div className="flex flex-col xl:space-y-3">
                        <label htmlFor="title" className="form-label">Título del Curso:</label>
                        <input
                            type="text"
                            className="xl:p-3 xl:rounded-xl shadow-sm shadow-gray-500"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col xl:space-y-3">
                        <label htmlFor="description" className="form-label">Descripción del Curso:</label>
                        <textarea
                            className="xl:p-3 xl:rounded-xl shadow-sm shadow-gray-500"
                            id="description"
                            name="description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar Curso</button>
                </form>
            </div>
        </div>
    );
};

export default EditCourseComponent;
