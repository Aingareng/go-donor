import React, { Fragment, SyntheticEvent, useRef } from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import { logoIcon } from '../../assets/icons';
import { userAdd } from "../../interface/functions/fetchUsers";


const Register: React.FC = () => {
  const navigate = useNavigate()
  const fNameInput = useRef<HTMLInputElement>(null)
  const lNameInput = useRef<HTMLInputElement>(null)
  const ageInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const pwdInput = useRef<HTMLInputElement>(null)
  const phoneInput = useRef<HTMLInputElement>(null)
  const streetInput = useRef<HTMLInputElement>(null)
  const distInput = useRef<HTMLSelectElement>(null)
  const bloodInput = useRef<HTMLSelectElement>(null)


  const sendRequest = async (event: SyntheticEvent) => {
    event.preventDefault()
    const user = {
      firstName: fNameInput.current?.value,
      lastName: lNameInput.current?.value,
      age: ageInput.current?.value,
      email: emailInput.current?.value,
      password: pwdInput.current?.value,
      phone: phoneInput.current?.value,
      street: streetInput.current?.value,
      district: distInput.current?.value,
      bloodType: bloodInput.current?.value
    }
    const { firstName, lastName, age, email, password, phone, street, district, bloodType } = user
    const response = await userAdd("http://localhost:8000/user/register", firstName, lastName, age, email, password, phone, street, district, bloodType)


    if (response?.status === 400) {
      alert("Akun sudah terdaftar !")
    } else {
      alert("Anda terdaftar sebagai pendonor")
      navigate('/login')
    }
  }

  return (
    <Fragment>
      <Helmet><title>Register</title></Helmet>
      <section className='2xl:flex 2xl:justify-center 2xl:flex-col 2xl:items-center 2xl:mx-auto 2xl:my-[3%] 2xl:box-border 2xl:p-[10px] sm:w-[100%] lg:w-[50%] xl:w-[50%] 2xl:w-[50%]'>
        <img src={logoIcon} alt="" />
        <div className='2xl:bg-white 2xl:shadow-md 2xl:shadow-gray-300 2xl:mt-[10px]  2xl:w-[90%] 2xl:rounded-md 2xl:p-[15px] 2xl:box-border'>
          <p className='2xl:text-center 2xl:font-semibold 2xl:text-[#F7216E]'>Register Form</p>
          <form onSubmit={sendRequest} className='2xl:p-[5px] 2xl:flex 2xl:justify-center 2xl:flex-col 2xl:items-center'>
            <div className='2xl:w-[90%] 2xl:flex 2xl:justify-between'>
              <input className='2xl:w-[45%] 2xl:h-[40px] 2xl:my-[5px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md ' ref={fNameInput} type="text" placeholder='First Name' />
              <input className='2xl:w-[45%] 2xl:h-[40px] 2xl:my-[5px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md ' ref={lNameInput} type="text" placeholder='last Name' />
            </div>
            <input className='2xl:w-[90%] 2xl:h-[40px] 2xl:my-[5px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md ' ref={ageInput} type="number" placeholder='Age' />
            <input className='2xl:w-[90%] 2xl:h-[40px] 2xl:my-[5px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md ' ref={emailInput} type="email" placeholder='Email' />
            <input className='2xl:w-[90%] 2xl:h-[40px] 2xl:my-[5px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md ' ref={pwdInput} type="password" placeholder='Password' />
            <input className='2xl:w-[90%] 2xl:h-[40px] 2xl:my-[5px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md ' ref={phoneInput} type="number" placeholder='Phone number' />
            <div className='2xl:w-[90%] 2xl:flex 2xl:justify-between'>
              <input className='2xl:w-[45%] 2xl:h-[40px] 2xl:my-[5px] 2xl:mr-[7px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md' ref={streetInput} type="text" placeholder='Street' />

              <select className='2xl:w-[45%] 2xl:h-[40px] 2xl:my-[5px] 2xl:ml-[7px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md' ref={distInput} name="district-group" id="district-group">
                <option> Select district</option>
                <option value="Palu utara">Palu Utara</option>
                <option value="Palu selatan">Palu Selatan</option>
                <option value="Palu barat">Palu Barat</option>
                <option value="Palu timur">Palu Timur</option>
              </select>
              {/* <input className='2xl:w-[45%] 2xl:h-[40px] 2xl:my-[5px] 2xl:mr-[7px]  focus:outline-none 2xl:bg-slate-100 2xl:px-[5px] 2xl:py-10px] 2xl:rounded-md ' type="text" placeholder='Province' /> */}
            </div>
            <div className=' 2xl:w-[90%] 2xl:my-[5px] 2xl:flex 2xl:justify-between 2xl:items-center'>
              <label htmlFor="blood-group" className=''>Pilih Golongan Darah:</label>
              <select className='2xl:text-[#F7216E] 2xl:w-[45%] 2xl:p-[7px] 2xl:rounded-md hover:cursor-pointer focus:outline-none' ref={bloodInput} name="blood-group" id="blood-group">
                <option className='2xl:text-[#F7216E]' value="A">Golongan Darah A</option>
                <option className='2xl:text-[#F7216E]' value="B">Golongan Darah B</option>
                <option className='2xl:text-[#F7216E]' value="AB">Golongan Darah AB</option>
                <option className='2xl:text-[#F7216E]' value="O">Golongan Darah O</option>
              </select>
            </div>
            <hr className='2xl:w-full 2xl:border-[#B20080] 2xl:border-[1px] 2xl:my-[5px]' />
            <input className='2xl:w-[90%] 2xl:h-[40px] 2xl:mt-[10px] 2xl:text-white 2xl:my-[5px] 2xl:bg-[#F7216E] 2xl:px-[5px] 2xl:rounded-md 2xl:duration-300 2xl:ease-in hover:bg-[#B20080] hover:cursor-pointer' type="submit" value="Daftar" />
            <button onClick={() => navigate('/login')} className='2xl:w-[30%]  2xl:h-[40px] 2xl:mt-[10px] 2xl:text-[#F7216E] 2xl:my-[5px] 2xl:border-[#F7216E] 2xl:border-[1px] 2xl:px-[5px] 2xl:rounded-md 2xl:duration-300 2xl:ease-in hover:border-none hover:bg-[#B20080] hover:text-white hover:cursor-pointer'>Login</button>
          </form>
        </div>
      </section>
    </Fragment>
  )
}

export default Register