/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Navbar, Navmobile, Usercard } from '../../components'
import { bloodA, bloodAB, bloodB, bloodO } from '../../assets'
import { userList } from "../../interface/functions/fetchUsers";
import { emptyUser } from "../../assets/icons";
import axios from "axios"

const Donor = () => {
  const [bloodCategory, setBloodCategory] = useState('A')
  const [bloodImg, setBloodImg] = useState('')
  let [userSelect, setUserSelect] = useState<any>([])
  let [status, setStatus] = useState('2xl:hidden 2xl:mx-auto 2xl:w-[200px] 2xl:h-[200px]')
  const [emptyImg, setEmptyImg] = useState('')



  useEffect(() => {
    refreshToken()
    getUserJoin()


  }, [bloodCategory, userSelect])


  const refreshToken = async () => {
    try {
      const token = localStorage.getItem("REFRESH_TOKEN")
      const response = await axios.post("http://localhost:8000/user/token", {
        refreshToken: token
      })
      const { accessToken } = response.data
      localStorage.setItem("ACCESS_TOKEN", accessToken)
    } catch (error) {
      console.error(error)
    }
  }

  const getUserJoin = async () => {

    const token = localStorage.getItem("ACCESS_TOKEN")

    const user = await userList("http://localhost:8000/user/donor", bloodCategory, String(token))

    user?.json().then((users: []) => {

      setUserSelect(users)


      if (userSelect.length <= 0) {
        setStatus('2xl:mx-auto 2xl:w-[200px] 2xl:h-[200px]')
        setEmptyImg(emptyUser)
      } else {
        setStatus('2xl:hidden 2xl:mx-auto 2xl:w-[200px] 2xl:h-[200px]')
      }

      switch (bloodCategory) {

        case "A":
          setBloodImg(bloodA)
          break;
        case "B":
          setBloodImg(bloodB)
          break;
        case "AB":
          setBloodImg(bloodAB)
          break;
        case "O":
          setBloodImg(bloodO)
          break;
        default:
          break;
      }

    })

  }




  return (
    <Fragment>
      <Helmet>
        <title>Donor</title>
      </Helmet>
      <header>
        <Navbar />
      </header>
      <main className='mb-[30%]'>
        <section className='2xl:p-[5%]'>
          <div className=' 2xl:w-[90%] 2xl:my-[5px] 2xl:mb-[3%]'>
            <label htmlFor="blood-group">Kategori golongan darah :</label>
            <select className='2xl:text-[#F7216E] 2xl:p-[7px] 2xl:rounded-md hover:cursor-pointer focus:outline-none' onChange={(e) => setBloodCategory(e.target.value)} name="blood-group" id="blood-group">
              {/* <option className='2xl:text-[#F7216E]' value="ALL">All</option> */}
              <option className='2xl:text-[#F7216E]' value="A">Golongan Darah A</option>
              <option className='2xl:text-[#F7216E]' value="B">Golongan Darah B</option>
              <option className='2xl:text-[#F7216E]' value="AB">Golongan Darah AB</option>
              <option className='2xl:text-[#F7216E]' value="O">Golongan Darah O</option>
            </select>
          </div>
          <img className={status} src={emptyImg} alt="" />
          <ul className='2xl:flex 2xl:items-center 2xl:justify-center 2xl:flex-wrap'>
            {
              // eslint-disable-next-line array-callback-return

              userSelect.map((val: any, index: number) => (

                <li key={index} className='2xl:mx-[20px] 2xl:my-[20px]'>

                  <Usercard getContact={"62" + String(val.phone)} typeBlood={bloodImg} userName={val.name} address={{
                    street: `${val.address.street}`,
                    district: `${val.address.district}`
                  }} userEmail={val.email} /></li>

              ))
            }
          </ul>
        </section>
      </main>
      <Navmobile />
      <footer className='2xl:bg-[#8d103e] 2xl:py-[3%] || sm:hidden'>
        <h1 className='2xl:text-center 2xl:text-lg'>&copy;saltacademybatch4</h1>
      </footer>
    </Fragment>
  )
}

export default Donor