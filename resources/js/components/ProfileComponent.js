import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DropZone from './DropZone';
import Swal from 'sweetalert2';

const ProfileComponent = () => {
    const { first_name, last_name, birth_date, bio: currentBio, nickname, email: currentEmail, photo: currentPhoto, logout } = useAuth(); // Obtener la biografía actual desde el contexto
    const [email, setEmail] = useState(currentEmail);
    const [bio, setBio] = useState(currentBio); // Establecer el estado inicial de la biografía
    const [newPhoto, setNewPhoto] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/get-user');
                setBio(response.data.bio); // Asegurarse de establecer la biografía
                setEmail(response.data.email);
                setNewPhoto(response.data.photo);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('bio', bio); // Asegurarse de que la biografía se envíe en el formulario
        if (newPhoto && typeof newPhoto !== 'string') {
            formData.append('photo', newPhoto);
        }
        if (password) {
            formData.append('password', password);
            formData.append('password_confirmation', passwordConfirmation);
        }

        try {
            await axios.post('/update-user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'El perfil se ha actualizado satisfactoriamente.'
            });           
            window.location.reload();
        } catch (error) {
            console.error('Error updating user data', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al actualizar el perfil.'
            });        
        }
    };

    return (
        <div>
            <h1 className='xl:text-4xl xl:p-10'>Bienvenid@, {first_name} {last_name}</h1>
            <div className="flex flex-col bg-blue-500 text-white xl:p-10">
                <form onSubmit={handleSubmit} className='xl:space-y-10'>
                    <div className="profile flex items-center xl:space-x-5">
                        <div className='profile-photo'>
                            {currentPhoto && (
                                <div>
                                    <DropZone className='absolute' dropzoneClass='absolute xl:w-32 xl:h-32 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-black hover:text-white border xl:border-2 border-white border-dashed xl:text-xs text-center transition-all cursor-pointer rounded-full' previewClass='w-full rounded-full' onFileSelect={setNewPhoto} />
                                    <img src={`/storage/images/${currentPhoto}`} alt="Current Photo" className="xl:w-32 xl:h-32 rounded-full" />
                                </div>
                            )}
                        </div>
                        <div className="profile-info flex flex-col">
                            <h2 className='xl:text-2xl'>{first_name} {last_name}</h2>
                            <h3 className='xl:text-xl opacity-70'>{currentEmail}</h3>
                        </div>
                    </div>
                    <div className="profile-bottom w-full flex flex-col xl:space-y-5">
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col w-5/12">
                                <label className='xl:text-base'>Nombre(s):</label>
                                <div className='text-black bg-white xl:p-3 xl:text-sm xl:shadow-lg shadow-black'>{first_name}</div>
                            </div>
                            <div className="flex flex-col w-5/12">
                                <label className='xl:text-base'>Apellidos:</label>
                                <div className='text-black bg-white xl:p-3 xl:text-sm xl:shadow-lg shadow-black'>{last_name}</div>
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col w-5/12">
                                <label className='xl:text-base'>Fecha de Nacimiento:</label>
                                <div className='text-black bg-white xl:p-3 xl:text-sm xl:shadow-lg shadow-black'>{birth_date}</div>
                            </div>
                            <div className='flex flex-col w-5/12'>
                                <label className='xl:text-base'>Correo Electrónico:</label>
                                <input
                                    type="email"
                                    value={email}
                                    className='text-black xl:p-3 xl:text-sm xl:shadow-lg shadow-black'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-between">    
                            <div className='flex flex-col w-5/12'>
                                <label className='xl:text-base'>Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    value={password}
                                    className='text-black xl:p-3 xl:text-sm xl:shadow-lg shadow-black'
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Dejar en blanco para mantener la contraseña actual"
                                />
                            </div>
                            <div className='flex flex-col w-5/12'>
                                <label className='xl:text-base'>Confirmar Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    value={passwordConfirmation}
                                    className='text-black xl:p-3 xl:text-sm xl:shadow-lg shadow-black'
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    placeholder="Dejar en blanco para mantener la contraseña actual"
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-between">    
                            <div className='flex flex-col w-5/12'>
                                <label className='xl:text-base'>Mi Biografía</label>
                                <textarea
                                    value={bio}
                                    className='text-black xl:p-3 xl:text-sm xl:shadow-lg shadow-black'
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Cuéntanos sobre tí"
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='xl:text-base w-fit px-4 py-2 bg-yellow-500 rounded hover:bg-black'>Guardar Cambios</button>
                </form>
                <button onClick={logout} className="xl:text-base w-fit mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-black">Cerrar Sesión</button> {/* Botón de logout al final del formulario */}
            </div>
        </div>
    );
};

export default ProfileComponent;
