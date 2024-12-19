import React from 'react';

const WelcomeComponent = () => {
    return (
        <div>
            <div className="welcome-one">
                <div className='welcome-banner'>
                    <div className='bg-black bg-opacity-70 flex flex-col justify-center items-center xl:p-20 text-white'>
                        <h1 className='xl:text-6xl xl:pb-5'>¡Bienvenido a Learnify!</h1>
                        <h2 className='xl:text-4xl'>La plataforma donde puedes enseñar, aprender y crecer.</h2>
                        <h3 className='italic xl:text-xl'>Crea y vende tu contenido o accede a un mundo de conocimiento</h3>
                    </div>
                </div>
                <div className='flex justify-center xl:space-x-20 xl:p-14'>
                    <div className='w-5/12 flex flex-col justify-center items-center text-center bg-gray-200 xl:py-6 xl:rounded-2xl shadow-md shadow-gray-300 xl:space-y-6'>
                        <h3 className='xl:text-2xl xl:w-8/12'>¡Inscríbete ahora y descubre nuevas oportunidades!</h3>
                        <img src="/images/welcome-card-1.png" alt="welcome-card" className='xl:w-40' />
                        <a href="/register" className="welcome-card-button relative text-white xl:text-xl xl:py-1 xl:px-5 rounded-xl overflow-hidden group">
                            <span className="relative z-10 xl:text-xl">¡Empieza ahora!</span>
                            <div className="absolute inset-0 bg-black opacity-0 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 group-hover:opacity-100"></div>
                        </a>                    
                    </div>
                    <div className='w-5/12 flex flex-col justify-center items-center text-center bg-gray-200 xl:py-6 xl:rounded-2xl shadow-md shadow-gray-300 xl:space-y-6'>
                        <h3 className='xl:text-2xl xl:w-8/12'>Reanuda tu viaje de aprendizaje.</h3>
                        <img src="/images/welcome-card-2.png" alt="welcome-card" className='xl:w-36' />
                        <a href="/login" className="welcome-card-button relative text-white xl:text-xl xl:py-1 xl:px-5 rounded-xl overflow-hidden group">
                            <span className="relative z-10 xl:text-xl">¡Entra ya!</span>
                            <div className="absolute inset-0 bg-black opacity-0 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 group-hover:opacity-100"></div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='welcome-two flex flex-col items-center justify-center xl:p-12 xl:space-y-12'>
                <h2 className="text-white xl:text-4xl italic">¿Qué nos hace diferentes?</h2>
                <div className="flex flex-wrap justify-center items-center xl:gap-x-28 xl:gap-y-16">
                    <div className="flex flex-col items-center justify-center bg-white xl:px-5 xl:py-7 xl:rounded-xl xl:w-1/3 text-justify xl:space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className='xl:w-12' viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64c-30.37-38-80-64-208-64c-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96m0 0v288"/></svg>                        
                        <h3 className="xl:text-3xl">¡Aprende lo que sea!</h3>
                        <p className="xl:text-lg xl:px-10 !leading-tight">Obtén acceso a una basta librería de conocimientos en todos los ambitos. Aprende donde sea y cuando sea.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white xl:px-5 xl:py-7 xl:rounded-xl xl:w-1/3 text-justify xl:space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className='xl:w-12' viewBox="0 0 24 24"><path fill="currentColor" d="M20 17c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H9.5c.3.6.5 1.3.5 2h10v11h-9v2m4-10v2H9v13H7v-6H5v6H3v-8H1.5V9c0-1.1.9-2 2-2zM8 4c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m9 2h2v8h-2zm-3 4h2v4h-2zm-3 0h2v4h-2z"/></svg>
                        <h3 className="xl:text-3xl">¡Enseña a otros!</h3>
                        <p className="xl:text-lg xl:px-10 !leading-tight">Comparte tu experiencia con el mundo. Crea y sube tu propio contenido e inspira y educa a otros.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white xl:px-5 xl:py-7 xl:rounded-xl xl:w-1/3 text-justify xl:space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className='xl:w-12' viewBox="0 0 16 16"><path fill="currentColor" d="M7 2H5a3.5 3.5 0 1 0 0 7h2v3H2.5v2H7v2h2v-2h2a3.5 3.5 0 1 0 0-7H9V4h4.5V2H9V0H7zm2 7h2a1.5 1.5 0 0 1 0 3H9zM7 7H5a1.5 1.5 0 1 1 0-3h2z"/></svg>
                        <h3 className="xl:text-3xl">Gana dinero</h3>
                        <p className="xl:text-lg xl:px-10 !leading-tight">Convierte tus aptitudes en un ingreso. Vende tu contenido y genera ganancias desde tus conocimientos.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white xl:px-5 xl:py-7 xl:rounded-xl xl:w-1/3 text-justify xl:space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className='xl:w-12' viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m7 1.367l6.5 2.817L7 7L.5 4.184z"/><path d="m3.45 5.469l.006 3.064S4.529 9.953 7 9.953s3.55-1.42 3.55-1.42l-.001-3.064m-8.854 5.132v-5.89m.001 8.282a1.196 1.196 0 1 0 0-2.392a1.196 1.196 0 0 0 0 2.392"/></g></svg>
                        <h3 className="xl:text-3xl">Amplía tus habilidades</h3>
                        <p className="xl:text-lg xl:px-10 !leading-tight">¡Mejórate continuamente! Aprende de expertos, adquiere nuevas habilidades y sigue tu progreso al instante.</p>
                    </div>
                </div>
                <h2 className='text-white xl:text-4xl italic'>¡Aún hay más para ti!</h2>
            </div>
            <div className='welcome-three flex flex-col xl:p-12 justify-center items-center space-y-14'>
                <h2 className="text-slate-800-950 xl:text-4xl xl:px-20 text-center xl:w-5/6">Aprende en cualquier momento, en cualquier lugar</h2>
                <div className="flex justify-between gap-20">
                    <div className="bg-gray-200 flex flex-col justify-center items-center xl:w-1/3 xl:pb-10 xl:pt-7 xl:space-y-5 xl:rounded-xl shadow-lg shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-1/4' viewBox="0 0 24 24"><path fill="currentColor" d="M2.27 19.462q-.214 0-.358-.144t-.143-.356t.144-.357t.356-.144h19.462q.213 0 .356.144t.144.356t-.144.357t-.356.144zm2.346-2q-.691 0-1.153-.463T3 15.846V6.077q0-.69.463-1.153t1.152-.462h14.77q.69 0 1.152.462T21 6.077v9.77q0 .69-.463 1.152t-1.153.463zm0-1h14.769q.23 0 .423-.193t.192-.423V6.077q0-.23-.192-.423q-.193-.193-.424-.193H4.616q-.231 0-.424.193Q4 5.846 4 6.077v9.77q0 .23.192.422t.423.193m-.615 0v-11z"/></svg>
                        <h3 className="xl:text-3xl text-center">Computadoras</h3>
                        <p className="xl:text-lg text-justify !leading-tight xl:px-9">Accede a cursos completos en cualquier dispositivo y disfruta una experiencia de aprendizaje envolvente.</p>
                    </div>
                    <div className="bg-gray-200 flex flex-col justify-center items-center xl:w-1/3 xl:pb-10 xl:pt-7 xl:space-y-5 xl:rounded-xl shadow-lg shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-1/4' viewBox="0 0 32 32"><path fill="currentColor" d="M22.5 13c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5s8.5-3.8 8.5-8.5s-3.8-8.5-8.5-8.5m6.5 8h-3c0-2-.3-4-.9-5.5c2.1 1 3.7 3 3.9 5.5m-6.5 7c-.4-.2-1.3-1.8-1.5-5h2.9c-.2 3.2-1 4.8-1.4 5M21 21c.1-3.8 1.1-5.8 1.4-6c.4.2 1.4 2.2 1.5 6zm-1.1-5.5c-.6 1.5-.8 3.5-.9 5.5h-3c.2-2.5 1.8-4.5 3.9-5.5M16.2 23H19c.1 1.6.4 3.2.9 4.5c-1.8-.8-3.2-2.5-3.7-4.5m8.9 4.5q.75-1.95.9-4.5h2.9c-.6 2-2 3.7-3.8 4.5"/><path fill="currentColor" d="M25.8 10c-.9-4.6-5-8-9.8-8s-8.9 3.4-9.8 8.1c-3.5.7-6.2 3.7-6.2 7.4C0 21.6 3.4 25 7.5 25H11v-2H7.5c-3 0-5.5-2.5-5.5-5.5c0-2.9 2.2-5.3 5.1-5.5H8v-.9c.5-4 3.9-7.1 8-7.1c3.7 0 6.8 2.6 7.7 6z"/></svg>
                        <h3 className="xl:text-3xl text-center">Acceso sin conexión</h3>
                        <p className="xl:text-lg text-justify !leading-tight xl:px-9">Descarga cursos para acceder a ellos en cualquier momento. Aprende sin conexión a internet.</p>
                    </div>
                    <div className="bg-gray-200 flex flex-col justify-center items-center xl:w-1/3 xl:pb-10 xl:pt-7 xl:space-y-5 xl:rounded-xl shadow-lg shadow-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-1/4' viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm1.2.2v17.6h11.6V3.2zM12 20a1 1 0 1 1 0-2a1 1 0 0 1 0 2"/></svg>
                        <h3 className="xl:text-3xl text-center">Celulares</h3>
                        <p className="xl:text-lg text-justify !leading-tight xl:px-9">Aprende sobre la marcha de tu día a día con nuestro aplicativo móvil. Perfecto para estilos de vida ocupados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeComponent;
