import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddCourseContentComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contentTitle, setContentTitle] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [pdfFile, setPdfFile] = useState(null);

    const handleAddContent = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', contentTitle);
        formData.append('description', contentDescription);
        formData.append('video_url', videoUrl);
        if (pdfFile) formData.append('pdf_path', pdfFile);
    
        try {
            await axios.post(`/api/courses/${id}/contents`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Contenido del curso añadido satisfactoriamente.');
            setContentTitle('');
            setContentDescription('');
            setVideoUrl('');
            setPdfFile(null);
            navigate(`/purchased-courses/${id}`);
        } catch (error) {
            console.error('Error adding course content', error);
            alert('Se ha producido un error al añadir el contenido del curso.');
            console.error('Detalles del error:', error.response.data); // Añadir detalles del error
        }
    };    

    return (
        <div className='xl:py-10 flex justify-center items-center'>
            <div className="bg-gray-100 flex flex-col justify-center items-center w-2/3 xl:p-10 shadow-sm shadow-black xl:rounded-xl">
                <h2>Añadir Contenido del Curso</h2>
                <form onSubmit={handleAddContent} encType="multipart/form-data" className='xl:space-y-10 w-full'>
                    <div className="flex flex-col xl:space-y-3">
                        <label htmlFor="contentTitle" className="form-label">Título del Contenido:</label>
                        <input
                            type="text"
                            className="xl:p-3 xl:rounded-xl shadow-sm shadow-gray-500"
                            id="contentTitle"
                            name="contentTitle"
                            value={contentTitle}
                            onChange={(e) => setContentTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col xl:space-y-3">
                        <label htmlFor="contentDescription" className="form-label">Descripción del Contenido:</label>
                        <textarea
                            className="xl:p-3 xl:rounded-xl shadow-sm shadow-gray-500"
                            id="contentDescription"
                            name="contentDescription"
                            rows="4"
                            value={contentDescription}
                            onChange={(e) => setContentDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex flex-col xl:space-y-3">
                        <label htmlFor="videoUrl" className="form-label">URL del Video:</label>
                        <input
                            type="url"
                            className="xl:p-3 xl:rounded-xl shadow-sm shadow-gray-500"
                            id="videoUrl"
                            name="videoUrl"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="pdfPath" className="form-label">PDF (opcional):</label>
                        <input
                            type="file"
                            name="pdfPath"
                            id="pdfPath"
                            className="form-control"
                            onChange={(e) => setPdfFile(e.target.files[0])}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Añadir Contenido</button>
                </form>
            </div>
        </div>
    );
};

export default AddCourseContentComponent;
