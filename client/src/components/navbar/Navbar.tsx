import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logo } from '../../assets/images'
import { user } from "../../assets/icons";

const Navbar = () => {
  const navigate = useNavigate()
  const [userMenu, setUserMenu] = useState('2xl:hidden 2xl:absolute 2xl:top-[200%] 2xl:rounded-md 2xl:right-[-5%] 2xl:bg-slate-100 2xl:p-[20px]')
  const [showProfil, setShowProfil] = useState('2xl:hidden 2xl:relative 2xl:px-[30px] hover:cursor-pointer')

  const showUserMenu = () => {
    setUserMenu('2xl:absolute 2xl:top-[200%] 2xl:rounded-md 2xl:right-[-5%] 2xl:bg-slate-100 2xl:p-[20px]')
  }
  const hiddeUserMenu = () => {
    setUserMenu('2xl:hidden 2xl:absolute 2xl:top-[200%] 2xl:rounded-md 2xl:right-[-5%] 2xl:bg-slate-100 2xl:p-[20px]')
  }

  const checkToken = () => {
    const check = localStorage.getItem("ACCESS_TOKEN")
    if (!check) {
      alert("Anda tidak punya akses, silahkan bergabung terlebih dahulu")
      navigate('/login')
    } else {
      navigate('/donor')

    }


  }

  const eventLogOut = () => {
    localStorage.clear()


    setShowProfil('2xl:hidden 2xl:relative 2xl:px-[30px] hover:cursor-pointer')
    navigate('/')

  }





  useEffect(() => {
    const check = localStorage.getItem("ACCESS_TOKEN")
    if (!check) {
      setShowProfil('2xl:hidden 2xl:relative 2xl:px-[30px] hover:cursor-pointer')
    } else {
      return setShowProfil('2xl:relative 2xl:px-[30px] hover:cursor-pointer')
    }

  }, [navigate])
  return (
    <Fragment>
      <nav className='nav-default-style'>
        <section className='sm:w-full'>
          <img className='2xl:w-[25%] md:w-[20%] sm:mx-auto sm:w-[15%]' src={logo} alt="logo go donor" />
        </section>
        <section className='2xl:flex 2xl:items-center 2xl:justify-center || sm:hidden'>
          <ul className=' 2xl:flex 2xl:items-center 2xl:justify-center 2xl:p-[3px] '>
            <li className='nav-menu-default-style' onClick={() => navigate('/')}>Beranda</li>
            <li className='nav-menu-default-style' onClick={() => checkToken()}>Pendonor</li>
            <li className={showProfil} onMouseLeave={hiddeUserMenu} onMouseMove={showUserMenu} ><img className='2xl:scale-[240%]' src={user} alt="user_image" />
              <ul className={userMenu}>
                <hr className='2xl:my-[5%] ' />
                <li onClick={() => eventLogOut()} className='2xl:text-sm hover:text-[#8d103e]'>Keluar</li>
              </ul>
            </li>

          </ul>

        </section>
      </nav>
    </Fragment>
  )
}

export default Navbar