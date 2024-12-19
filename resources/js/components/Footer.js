import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col items-center justify-center xl:p-10 xl:space-y-10'>
      <div className="flex justify-between w-full xl:pb-6 border-b">
        <ul className='w-1/5 xl:space-y-2'>
          <li className='xl:text-xl font-bold'>Sobre Learnify</li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Sobre nosotros</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>¿Qué somos?</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Nuestros diferenciadores</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Beneficios</a></li>
        </ul>
        <ul className='w-1/5 xl:space-y-2'>
          <li className='xl:text-xl font-bold'>Recursos</li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Blog</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Centro de ayuda</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Testimonios</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>FAQs</a></li>
        </ul>
        <ul className='w-1/5 xl:space-y-2'>
          <li className='xl:text-xl font-bold'>Comunidad</li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Foros</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Eventos</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Artículos</a></li>
        </ul>
        <ul className='w-1/5 xl:space-y-2'>
          <li className='xl:text-xl font-bold'>Legal</li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Términos y condiciones</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Política de Privacidad</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Política de tratamiento de datos</a></li>
          <li><a href='/' className='xl:text-base hover:text-blue-500'>Política de cookies</a></li>
        </ul>
      </div>
      <h4 className='xl:text-xl'>@ 2024 Learnify | Todos los derechos reservados</h4>
    </div>
  )
}

export default Footer
