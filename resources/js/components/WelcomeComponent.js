import React from 'react';

const WelcomeComponent = () => {
    return (
        <div>
            <div>
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
                            <span className="relative z-10">Empieza ahora!</span>
                            <div className="absolute inset-0 bg-black opacity-0 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 group-hover:opacity-100"></div>
                        </a>                    
                    </div>
                    <div className='w-5/12 flex flex-col justify-center items-center text-center bg-gray-200 xl:py-6 xl:rounded-2xl shadow-md shadow-gray-300 xl:space-y-6'>
                        <h3 className='xl:text-2xl xl:w-8/12'>Reanuda tu viaje de aprendizaje.</h3>
                        <img src="/images/welcome-card-2.png" alt="welcome-card" className='xl:w-36' />
                        <a href="/login" className="welcome-card-button relative text-white xl:text-xl xl:py-1 xl:px-5 rounded-xl overflow-hidden group">
                            <span className="relative z-10">¡Entra ya!</span>
                            <div className="absolute inset-0 bg-black opacity-0 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 group-hover:opacity-100"></div>
                        </a>
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    );
};

export default WelcomeComponent;
