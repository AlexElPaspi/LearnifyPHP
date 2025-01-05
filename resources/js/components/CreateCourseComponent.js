import React, { useState } from 'react';
import axios from 'axios';

const CreateCourseComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (logo) {
            formData.append('logo', logo);
        }

        try {
            const response = await axios.post('/create-course', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('El curso se ha creado exitosamente.');
            window.location.reload();
        } catch (error) {
            console.error('Error creating course', error);
            alert('Se ha producido un error al crear el curso.');
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setLogo(event.target.files[0]);
        }
    };

    return (
        <div className="container">
            <h2>Crear un Nuevo Curso</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título del Curso:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción del Curso:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="logo" className="form-label">Logo del Curso (Opcional):</label>
                    <input
                        type="file"
                        className="form-control"
                        id="logo"
                        name="logo"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Curso</button>
            </form>
        </div>
    );
};

export default CreateCourseComponent;
