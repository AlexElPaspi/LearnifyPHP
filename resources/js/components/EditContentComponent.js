import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditContentComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState({
        title: '',
        description: '',
        video_url: '',
        pdf_path: '',
        banner: ''
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`/api/course-contents/${id}`);
                setContent(response.data);
            } catch (error) {
                console.error('Error fetching content', error);
            }
        };

        fetchContent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setContent(prevContent => ({
            ...prevContent,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', content.title || '');
        formData.append('description', content.description || '');
        formData.append('video_url', content.video_url || '');
        if (content.pdf_path instanceof File) {
            formData.append('pdf_path', content.pdf_path);
        } else {
            formData.append('pdf_path', content.pdf_path || '');
        }
        if (content.banner instanceof File) {
            formData.append('banner', content.banner);
        } else {
            formData.append('banner', content.banner || '');
        }

        try {
            await axios.put(`/api/course-contents/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Contenido actualizado exitosamente.'
            });
            navigate(-1);
        } catch (error) {
            console.error('Detalles del error:', error.response.data);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Se ha producido un error al actualizar el contenido.',
            });
        }
    };

    if (!content.title) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full xl:p-10 flex flex-col justify-center text-gray-900 xl:space-y-10">
            <h2 className='xl:text-4xl'>Editar Clase</h2>
            <form onSubmit={handleSubmit} className="flex flex-col xl:space-y-3">
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={content.title}
                    onChange={handleChange}
                    className="xl:p-3 xl:rounded-xl shadow-sm shadow-gray-500"
                    required
                />
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={content.description}
                    onChange={handleChange}
                    className="xl:p-3 xl:rounded-xl shadow-sm shadow-gray-500"
                    rows="4"
                    required
                ></textarea>
                <label htmlFor="video_url">URL del Video:</label>
                <input
                    type="url"
                    id="video_url"
                    name="video_url"
                    value={content.video_url}
                    onChange={handleChange}
                    className="xl:p-3 xl:rounded-xl shadow-sm shadow-gray-500"
                    required
                />
                <label htmlFor="pdf_path">Archivo PDF (opcional):</label>
                <input
                    type="file"
                    id="pdf_path"
                    name="pdf_path"
                    onChange={handleChange}
                    className="xl:p-5 xl:rounded-xl shadow-sm shadow-gray-500"
                />
                {content.pdf_path && !content.pdf_path instanceof File && (
                    <div className="mt-2">PDF actual: <a href={`/storage/${content.pdf_path}`} target="_blank" rel="noopener noreferrer">{content.title}</a></div>
                )}
                <label htmlFor="banner">Banner del Curso (opcional):</label>
                <input
                    type="file"
                    id="banner"
                    name="banner"
                    onChange={handleChange}
                    className="xl:p-5 xl:rounded-xl shadow-sm shadow-gray-500"
                />
                {content.banner && !content.banner instanceof File && (
                    <div className="mt-2">
                        Banner actual:
                        <img src={`/storage/${content.banner}`} alt="Course Banner" className="w-40" />
                    </div>
                )}
                <button type="submit" className="btn btn-primary xl:w-full xl:p-3 bg-blue-600 text-white hover:bg-blue-700">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditContentComponent;
