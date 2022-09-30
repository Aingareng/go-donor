/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Navbar, Card, Hero, Navmobile, EditSection } from '../../components'
import { bloodA, bloodB, bloodAB, bloodO } from "../../assets";
import { userJoin } from "../../interface/functions/fetchUsers";
import { logoIcon } from "../../assets/icons";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios"

const Home: React.FC = () => {
  const [userBloodA, setUserBloodA] = useState(0)
  const [userBloodAB, setUserBloodAB] = useState(0)
  const [userBloodB, setUserBloodB] = useState(0)
  const [userBloodO, setUserBloodO] = useState(0)
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  useEffect(() => {


    userJoin("http://localhost:8000/user")
      .then(result => {
        result?.json()
          .then(user => {
            const { dataDonor } = user
            dataDonor.map((blood: any) => {
              const { bloodType } = blood

              if (bloodType === "A") setUserBloodA((count) => count + 1)
              if (bloodType === "AB") setUserBloodAB((count) => count + 1)
              if (bloodType === "B") setUserBloodB((count) => count + 1)
              if (bloodType === "O") setUserBloodO((count) => count + 1)
            })
          })
      })
      .catch(err => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <Helmet>
        <title>go donor</title>
      </Helmet>
      <header>
        <Navbar />
      </header>
      <main className='2xl:relative'>
        <Hero />
        <section className='2xl:pt-[10%] 2xl:pb-[10%] 2xl:bg-[#8d103e83] || md:flex md:flex-col md:justify-center'>
          <h1 className='2xl:mb-[5%] 2xl:text-center 2xl:font-mono 2xl:text-lg || sm:text-xl sm:w-[95%] sm:mx-auto || mobile-m:text-md'>Orang hebat yang telah bergabung <span>&#128079; &#128079; &#128079;</span></h1>
          <ul className='2xl:flex 2xl:justify-center 2xl:items-center 2xl:flex-wrap || md:text-center || mobile-m:w-full mobile-m:mx-auto'>
            <li className='2xl:mx-[30px] basis-[18%] || md:basis-[20%] md:mx-[5px] || sm:basis-[35%] sm:mx-[10px] sm:my-[10px] mobile-m:basis-[40%]'><Card bloodType={bloodAB} countPeople={userBloodAB} /></li>
            <li className='2xl:mx-[30px] basis-[18%] || md:basis-[20%] md:mx-[5px] || sm:basis-[35%] sm:mx-[10px] sm:my-[10px] mobile-m:basis-[40%] '><Card bloodType={bloodA} countPeople={userBloodA} /></li>
            <li className='2xl:mx-[30px] basis-[18%] || md:basis-[20%] md:mx-[5px] || sm:basis-[35%] sm:mx-[10px] sm:my-[10px] mobile-m:basis-[40%]'><Card bloodType={bloodB} countPeople={userBloodB} /></li>
            <li className='2xl:mx-[30px] basis-[18%] || md:basis-[20%] md:mx-[5px] || sm:basis-[35%] sm:mx-[10px] sm:my-[10px] mobile-m:basis-[40%]'><Card bloodType={bloodO} countPeople={userBloodO} /></li>
          </ul>
        </section>
        {/* <EditSection /> */}
      </main>
      <Navmobile />
      <footer className='2xl:bg-[#8d103e] 2xl:py-[3%] || sm:hidden'>
        <h1 className='2xl:text-center 2xl:text-lg'>&copy;saltacademybatch4</h1>
      </footer>
    </Fragment>
  )
}

export default Home