import React, { Fragment } from 'react'
import IProopsBloodType from '../../interface/IPropsBloodType'
import { userCount } from "../../assets/icons";

const Card: React.FC<IProopsBloodType> = ({ bloodType, countPeople }) => {
  return (
    <Fragment>

      <section className='2xl:shadow-lg 2xl:bg-slate-50 2xl:rounded-lg 2xl:p-[17px] 2xl:box-border 2xl:ease-in 2xl:duration-500 || mobile-m:w-full hover:shadow-white' >
        <div>
          <img className='mobile-m:w-full' src={bloodType} alt="" />
        </div>
        <div className='2xl:flex 2xl:items-center || sm:justify-center'>
          <img className='2xl:w-[30px] 2xl:h-[30px] 2xl:mr-[10px]' src={userCount} alt="" /> <span> :{countPeople}</span>
          {/* <p className='2xl:font-sans 2xl:text-lg'>People : <span>{countPeople}</span></p> */}
        </div>
      </section>
    </Fragment>
  )
}

export default Card