import React, { Fragment, useState } from 'react'
import { whatsappIcon } from "../../assets/icons";
import IPropsUsercard from '../../interface/IPropsUsercard'



const Usercard: React.FC<IPropsUsercard> = ({ getContact, typeBlood, userName, userEmail, address }) => {
  const [userBlood, setUserBlood] = useState('sm:border-none || 2xl:border-[#F7216E] 2xl:border-[1px] 2xl:w-[100px] 2xl:h-[100px] 2xl:rounded-full  ')
  const [getWhatsAppIcon, setWhatsAppIcon] = useState('sm:border-none || 2xl:border-[#F7216E] 2xl:border-[1px] 2xl:w-[100px] 2xl:h-[100px] 2xl:rounded-full 2xl:z-[-10] 2xl:absolute 2xl:top-0 2xl:translate-x-[-100%]')
  const [link, setLink] = useState('')
  let message = 'Halo%0ASaya%20membutuhkan%20darah%20anda,%20bisakah%20anda%20membantu%20saya?'

  const showContact = () => {
    setUserBlood('sm:border-none || 2xl:ease-in 2xl:duration-300 2xl:border-[#F7216E] 2xl:border-[1px] 2xl:w-[100px] 2xl:h-[100px] 2xl:rounded-full 2xl:z-[-10] 2xl:absolute 2xl:top-0 2xl:translate-x-[-100%]')
    setWhatsAppIcon('sm:border-none || 2xl:ease-in 2xl:duration-300 2xl:border-[#F7216E] 2xl:border-[1px] 2xl:w-[100px] 2xl:h-[100px] 2xl:rounded-full ')

    fetch(`https://api.whatsapp.com/send?phone=${getContact}&text=${message}`, {
      method: "GET",

    }).then(result => {
      setLink(result.url)
    })
  }
  const hiddenContact = () => {
    setUserBlood('sm:border-none || 2xl:ease-in 2xl:duration-300 2xl:border-[#F7216E] 2xl:border-[1px] 2xl:w-[100px] 2xl:h-[100px] 2xl:rounded-full')
    setWhatsAppIcon('sm:border-none || 2xl:ease-in 2xl:duration-300 2xl:border-[#F7216E] 2xl:border-[1px] 2xl:w-[100px] 2xl:h-[100px] 2xl:rounded-full 2xl:z-[-10] 2xl:absolute 2xl:top-0 2xl:translate-x-[-100%]')
  }


  return (
    <Fragment>
      <section onMouseMove={showContact} onMouseLeave={hiddenContact} className='mobile-m:w-[280px] || sm:w-[320px]  || 2xl:box-border 2xl:overflow-hidden 2xl:flex 2xl:items-center 2xl:border-[#F7216E] border-[2px] 2xl:w-[500px] 2xl:rounded-r-full 2xl:rounded-l-full hover:cursor-pointer'>
        <div className='2xl:relative 2xl:mr-[3%]'>
          <img className={userBlood} src={typeBlood} alt="user blood type" />
          <a href={link}><img className={getWhatsAppIcon} src={whatsappIcon} alt="" /></a>
        </div>
        <div className='sm:py-[3%]'>
          <h1 className='sm:text-md'>{userName}</h1>
          <hr className='border-[#F7216E]' />
          <p className='sm:text-sm'>{userEmail}</p>
          <p className='sm:text-sm'>{address.street}, {address.district}, {address.province = 'Sulawesi Tengah'}</p>
        </div>
        {/* <div className={whatsAppIcon}>
          <img className='2xl: border-[#F7216E]2xl: border-[1px]2xl: w-[100px] 2xl:h-[100px]2xl: rounded-full' src={whatsappIcon} alt="" />
        </div> */}
      </section>
    </Fragment >
  )
}

export default Usercard