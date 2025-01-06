import React, { useState } from 'react';

const DropZone = ({ onFileSelect, dropzoneClass, previewClass }) => {
    const [preview, setPreview] = useState(null);

    const handleFileSelect = (file) => {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        onFileSelect(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`dropzone ${dropzoneClass}`}
            onClick={() => document.getElementById('fileInput').click()}
        >
            {preview ? (
                <img src={preview} alt="Vista Previa" className={`preview ${previewClass}`} />
            ) : (
                <p className='xl:px-5 text-center'>Arrastra una imagen aquí o haz clic para seleccionar una.</p>
            )}
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleChange}
            />
        </div>
    );
};

export default DropZone;
