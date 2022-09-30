import React, { Fragment } from 'react'
import { maskot } from '../../assets/images'
import { useNavigate } from 'react-router-dom'

const Hero: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Fragment>
      <section className='2xl:flex 2xl:box-border 2xl:mb-[5%] || sm:flex-col-reverse'>
        <div className='2xl:py-[10%] 2xl:px-[5%]'>
          <h1 className='2xl:text-5xl 2xl:mb-[30px] 2xl:font-medium 2xl:text-[#F7216E] || md:text-4xl'>go donor app</h1>
          <p className='2xl:text-xl 2xl:text-[#F7216E] || md:text-sm'>Sebagai tempat untuk melakukan pencarian golongan darah maupun mendonasikan darah</p>
          <button onClick={() => navigate('/register')} className='2xl:mt-[10%] 2xl:bg-[#B20080] 2xl:px-[30px] 2xl:py-[10px] 2xl:rounded-md 2xl:shadow-sm 2xl:shadow-[#F7216E] 2xl:ease-in 2xl:duration-300 || md:px-[20px] hover:bg-opacity-0 hover:shadow-none hover:border-[#B20080] hover:border-[1px] hover:text-[#B20080]'>Yuk donor !</button>
        </div>
        <div className='2xl:box-border 2xl:p-[28px]'>
          <img className='2xl:w-[90%] md:w-full' src={maskot} alt="" />
        </div>
      </section>
    </Fragment>
  )
}

export default Hero