import React, { Fragment, SyntheticEvent, useRef } from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import { logoIcon } from '../../assets/icons';
import { userLogin } from "../../interface/functions/fetchUsers";

const Login: React.FC = () => {

  const navigate = useNavigate()
  const userEmail = useRef<HTMLInputElement>(null)
  const userPwd = useRef<HTMLInputElement>(null)


  const login = async (event: SyntheticEvent) => {
    event.preventDefault()
    try {
      const user = await userLogin(`http://localhost:8000/user/login`, userEmail.current?.value, userPwd.current?.value)

      if (user?.status === 400) {
        alert(" Email atau password salah !")
        return navigate('/login')

      } else if (user?.status === 200) {
        alert("Login Success")
        user?.json()
          .then((response) => {
            const { accessToken, refreshToken } = response
            localStorage.setItem("ACCESS_TOKEN", accessToken)
            localStorage.setItem("REFRESH_TOKEN", refreshToken)

          })
        return navigate('/donor')
      }


    } catch (error) {
      console.log(error)
      alert("Email atau password salah!")
      navigate('/login')
    }
  }
  return (
    <Fragment>
      <Helmet><title>Login</title></Helmet>
      <section className='2xl:flex 2xl:justify-center 2xl:flex-col 2xl:items-center 2xl:w-[50%] 2xl:mx-auto 2xl:my-[3%] 2xl:box-border 2xl:p-[10px] || md:w-[70%] || mobile-s:w-[5%] mobile-l:w-[90%] lg:w-[50%] xl:w-[50%]  '>
        <img className='sm:w-[80%]' src={logoIcon} alt="" />
        <div className='2xl:mt-[10%] 2xl:bg-white 2xl:shadow-md 2xl:shadow-gray-300 2xl:w-[90%] 2xl:rounded-md 2xl:p-[15px] 2xl:box-border ||mobile-m:w-[100%]'>
          <p className='2xl:text-center 2xl:font-semibold 2xl:text-[#F7216E] mobile-m:text-sm'>Login Ke Halaman</p>
          <form onSubmit={login} className='2xl:p-[5px] 2xl:flex 2xl:justify-center 2xl:flex-col 2xl:items-center'>
            <input className='2xl:w-[90%] 2xl:h-[40px] 2xl:my-[5px]  focus:outline-none bg-slate-100 px-[5px] py-10px] rounded-md ' ref={userEmail} type="email" name="email" id="email" placeholder='Email' />
            <input className='2xl:w-[90%] 2xl:h-[40px] 2xl:my-[5px]  focus:outline-none bg-slate-100 px-[5px] py-10px] rounded-md' ref={userPwd} type="password" name="password" id="password" placeholder='Password ' />
            <input className='2xl:w-[90%] 2xl:h-[40px] 2xl:mt-[10px] 2xl:text-white 2xl:my-[5px] 2xl:bg-[#F7216E] 2xl:px-[5px] 2xl:rounded-md 2xl:duration-200 2xl:ease-in hover:bg-[#B20080] hover:cursor-pointer' type="submit" value="Masuk" />
          </form>
          <hr className='2xl:w-full 2xl:border-[#B20080] 2xl:border-[1px] 2xl:my-[5px]' />
          <div onClick={() => navigate('/register')} className='2xl:p-[5px] 2xl:mt-[10px] 2xl:mx-auto 2xl:border-[#F7216E] 2xl:border-[1px] 2xl:w-[50%] 2xl:rounded-md 2xl:ease-in 2xl:duration-200 hover:cursor-pointer hover:bg-[#B20080] hover:border-none '>
            <p className='2xl:text-center 2xl:text-[#F7216E] 2xl:ease-in 2xl:duration-300 hover:text-white '>Daftar</p>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Login