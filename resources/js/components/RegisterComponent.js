import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

const RegisterComponent = () => {
  const birthDateRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    console.log('useEffect: Initializing Flatpickr');
    Flatpickr(birthDateRef.current, {
      locale: Spanish,
      dateFormat: 'Y-m-d',
      disableMobile: true, // Para asegurar que se usa el Flatpickr en dispositivos móviles también
      onChange: (selectedDates, dateStr) => {
        console.log('Date selected:', dateStr);
        setFormData((prevData) => ({
          ...prevData,
          birth_date: dateStr,
        }));
      },
    });
  }, []);

  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    console.log(`handleChange: Updating formData [${e.target.name}]`, e.target.value); // Añadir un log para verificar el cambio
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit: Form submitted'); // Añadir un log para verificar que se llama a handleSubmit

    // Verificar que todos los campos estén completos
    if (!formData.first_name || !formData.last_name || !formData.birth_date || !formData.email || !formData.password || !formData.password_confirmation) {
        setErrorMessage('Por favor, complete todos los campos requeridos.');
        console.log('handleSubmit: Form fields incomplete'); // Añadir un log para verificar los campos incompletos
        return;
    }

    try {
      console.log('Submitting form', { ...formData, _token: csrfToken }); // Añadir un log para verificar la información enviada
      const response = await axios.post('/register', { ...formData, _token: csrfToken });
      console.log('Response from server:', response); // Añadir un log para verificar la respuesta del servidor
      window.location.href = '/home'; // Redirigir al usuario a la página de inicio después del registro exitoso
    } catch (error) {
      setErrorMessage('Error registrando el usuario. Por favor, inténtelo de nuevo.');
      console.error('Error registrando el usuario:', error);
    }
  };
  
  return (
    <div className="register flex justify-end items-center xl:pt-5 xl:pb-10 xl:pr-32 bg h-fit">
        <div className="flex flex-col items-center justify-center w-1/3 h-full xl:space-y-12">
          <h2 className="xl:text-4xl text-white text-center">¡Aprende sin límites, enseña sin fronteras!</h2>
          <form onSubmit={handleSubmit} className='form-container flex flex-col items-center bg-white xl:px-12 xl:py-10 w-full xl:space-y-6 xl:rounded-xl shadow-sm shadow-black h-[calc(100vh-42vh)] overflow-auto'>
            <h3 className="xl:text-2xl text-center">Regístrate</h3>
            <input type="hidden" name="_token" value={csrfToken} />
            <input type="text" className='w-full xl:text-base xl:py-2 xl:px-3 border border-black xl:rounded-lg' name="first_name" placeholder="Nombre(s)" required onChange={handleChange} />
            <input type="text" className='w-full xl:text-base xl:py-2 xl:px-3 border border-black xl:rounded-lg' name="last_name" placeholder="Apellidos" required onChange={handleChange} />
            <input type="email" className='w-full xl:text-base xl:py-2 xl:px-3 border border-black xl:rounded-lg' name="email" placeholder="Correo Electrónico" required onChange={handleChange} />
            <input type="text" ref={birthDateRef} className='w-full xl:text-base xl:py-2 xl:px-3 border border-black xl:rounded-lg' name="birth_date" placeholder="Fecha de Nacimiento" required onChange={handleChange} />

            <div className="relative w-full">
              <input type={showPassword ? 'text' : 'password'} className='w-full xl:text-base xl:py-2 xl:px-3 border border-black xl:rounded-lg' name="password" placeholder="Contraseña" required onChange={handleChange} />              
              <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-3 text-gray-600'>
                {showPassword ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594"/><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m9-11L3 21"/></g></svg> 
                  : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594"/><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></g></svg>}
              </button>
            </div>

            <div className="relative w-full">
              <input type={showConfirmPassword ? 'text' : 'password'} className='w-full xl:text-base xl:py-2 xl:px-3 border border-black xl:rounded-lg' name="password_confirmation" placeholder="Confirmar Contraseña" required onChange={handleChange} />              
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-3 top-3 text-gray-600'>
                {showConfirmPassword ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594"/><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m9-11L3 21"/></g></svg> 
                  : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594"/><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></g></svg>}
              </button>
            </div>

            <button type="submit" className='bg-cyan-600 xl:text-base w-fit text-white xl:py-2 xl:px-14 xl:rounded-lg hover:bg-black'>Registrarse</button>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <h4 className='xl:text-base'>¿Ya tienes una cuenta? <a href="/login" className='text-cyan-700 hover:underline'>Entra ya!</a></h4>
            <p className='xl:text-xs text-justify text-gray-500 !leading-relaxed'>Al registrarte, aceptas los <a href="/" className='underline hover:text-cyan-700'>Términos y Condiciones</a>, la <a href="/" className='underline hover:text-cyan-700'>Política de Privacidad</a>, la <a href="/" className='underline hover:text-cyan-700'>Política de Tratamiento de Datos</a> y la <a href="/" className='underline hover:text-cyan-700'>Política de Cookies</a> de Learnify.</p>
          </form>
        </div>
    </div>
  );
};

export default RegisterComponent;
