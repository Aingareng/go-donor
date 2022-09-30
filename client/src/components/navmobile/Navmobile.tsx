import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { user, homeIcon, bloodIcon } from "../../assets/icons";

const Navmobile = () => {
  const navigate = useNavigate()
  const [userMenu, setUserMenu] = useState(' sm:hidden sm:bottom-[120%] sm:rounded-md sm:left-0 sm:bg-slate-100 sm:p-[20px]')
  const [showProfil, setShowProfil] = useState('sm:relative')
  const [handleNavbar, setHandleNavbar] = useState('sm:flex sm:items-center sm:justify-center sm:p-[10px] sm:mr-0')
  const showUserMenu = () => {
    setUserMenu('sm:absolute sm:bottom-[120%] sm:rounded-md sm:left-0  sm:bg-slate-100 sm:p-[20px]')
  }
  const hiddeUserMenu = () => {
    setUserMenu('sm:hidden sm:absolute sm:bottom-[200%] sm:rounded-md sm:left-0  sm:bg-slate-100 sm:p-[20px]')
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
    setShowProfil('sm:hidden')
    navigate('/')
  }

  useEffect(() => {
    const check = localStorage.getItem("ACCESS_TOKEN")
    if (!check) {
      setShowProfil('sm:hidden')
      setHandleNavbar('sm:flex sm:items-center sm:justify-center sm:ml-[50px]  sm:p-[10px] sm:mr-0')
      // return navigate('/')
    } else {
      setHandleNavbar('sm:flex sm:items-center sm:justify-center sm:p-[10px] sm:mr-0')
      return setShowProfil('sm:relative ')
    }

  }, [navigate])

  return (
    <Fragment>
      <section className='2xl:hidden sm:flex sm:items-center sm:justify-center sm:w-[70%] sm:fixed sm:bottom-0 sm:left-[15%] sm:rounded-t-3xl sm:mx-auto  sm:bg-[#8d103e]'>
        <ul className={handleNavbar}>
          <li onClick={() => navigate('/')}> <img className='sm:w-[30px] sm:h-[25px] ' src={homeIcon} alt="" /> </li>
          <li onClick={() => checkToken()} className="sm:mx-[50px]"><img className='sm:w-[30px] sm:h-[30px] ' src={bloodIcon} alt="" /></li>
          <li className={showProfil} onMouseLeave={hiddeUserMenu} onMouseMove={showUserMenu} ><img className='sm:w-[30px] sm:h-[30px] ' src={user} alt="user_image" />
            <ul className={userMenu}>

              <hr className='sm:my-[5%] ' />
              <li className='sm:text-sm hover:text-[#8d103e]' onClick={() => eventLogOut()}>Logout</li>
            </ul>
          </li>
        </ul>

      </section>
    </Fragment>
  )
}

export default Navmobile