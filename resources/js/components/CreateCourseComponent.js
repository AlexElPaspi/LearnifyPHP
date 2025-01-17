import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DropZone from './DropZone';
import 'sweetalert2/dist/sweetalert2.min.css';

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

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se ha creado el curso exitosamente.',
        customClass: {
          popup: 'bg-green-500 p-10 rounded-xl shadow-xl',
          title: 'text-white text-2xl font-bold mb-3',
          text: 'text-white text-lg'
        },
        buttonsStyling: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700'
      });

      window.location.reload();
    } catch (error) {
      console.error('Error creating course', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se ha producido un error al crear el curso.',
        customClass: {
          popup: 'p-10 rounded-xl shadow-xl',
          title: 'text-2xl font-bold mb-3',
          text: 'text-lg'
        },
        buttonsStyling: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700'
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
        <h2 className="xl:text-4xl text-black text-center">Crear un Nuevo Curso</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='flex flex-col xl:space-y-10 w-full'>
          <div className="flex flex-col xl:space-y-3">
            <label htmlFor="title" className="xl:text-base text-gray-700">Título del Curso:</label>
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
            <label htmlFor="description" className="xl:text-base text-gray-700">Descripción del Curso:</label>
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
          <div className="flex flex-col xl:space-y-3">
            <label htmlFor="logo" className="xl:text-base text-gray-700">Logo del Curso (Opcional):</label>
            <div className='flex justify-center'>
              <DropZone dropzoneClass='xl:w-64 h-32 text-white border border-2 border-dashed border-white border flex justify-center items-center cursor-pointer bg-black hover:bg-white hover:text-black hover:border-black xl:text-base overflow-hidden xl:rounded-xl' onFileSelect={handleFileSelect} />
            </div>
          </div>
          <button type="submit" className="bg-cyan-600 xl:text-base flex self-center text-white xl:py-2 xl:px-14 xl:rounded-lg hover:bg-blue-700">Crear Curso</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseComponent;
