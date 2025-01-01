import React, { useState } from 'react';

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login flex justify-end items-center xl:pt-5 xl:pb-10 xl:pr-32 bg h-fit">
      <div className="flex flex-col items-center justify-center w-1/3 h-full xl:space-y-12">
        <h2 className="xl:text-4xl text-white text-center">¡Aprende sin límites, enseña sin fronteras!</h2>
        <form method="POST" action="/login" className='form-container flex flex-col items-center bg-white xl:px-12 xl:py-10 w-full xl:space-y-6 xl:rounded-xl shadow-sm shadow-black h-[calc(100vh-42vh)] overflow-auto'>
          <h3 className="xl:text-2xl text-center">Inicia sesión</h3>
          <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
          <input type="email" className='w-full xl:text-base xl:py-2 xl:px-3 border border-black xl:rounded-lg' name="email" placeholder="Correo Electrónico" required />
          
          <div className="relative w-full">
            <input type={showPassword ? 'text' : 'password'} className='w-full xl:text-base xl:py-2 xl:px-3 border border-black xl:rounded-lg' name="password" placeholder="Contraseña" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-3 text-gray-600'>
              {showPassword ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594"/><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m9-11L3 21"/></g></svg> 
                : 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594"/><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></g></svg>}
            </button>
          </div>

          <a href="/" className='xl:text-base text-gray-500 hover:text-cyan-700 hover:underline'>¿Olvidaste tu contraseña?</a>
          <button type="submit" className='bg-cyan-600 xl:text-base w-fit text-white xl:py-2 xl:px-14 xl:rounded-lg'>Iniciar Sesión</button>
          <h4 className='xl:text-base'>¿No tienes una cuenta? <a href="/register" className='text-cyan-700 hover:underline'>Únete ahora!</a></h4>
          <p className='xl:text-xs text-justify text-gray-500 !leading-relaxed'>Recuerda que siendo parte de Learnify estás aceptando los <a href="/" className='underline hover:text-cyan-700'>Términos y Condiciones</a>, la <a href="/" className='underline hover:text-cyan-700'>Política de Privacidad</a>, la <a href="/" className='underline hover:text-cyan-700'>Política de Tratamiento de Datos</a> y la <a href="/" className='underline hover:text-cyan-700'>Política de Cookies</a> de Learnify.</p>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
