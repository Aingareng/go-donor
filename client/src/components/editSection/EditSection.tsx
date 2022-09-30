import React, { Fragment } from 'react'

const EditSection = () => {

  return (
    <Fragment>
      <section className='border-black border-2 2xl:box-border 2xl:w-[50%] 2xl:absolute 2xl:top-5 2xl:left-[20%] 2xl:bg-slate-400'>
        <form className='2xl:flex 2xl:justify-center 2xl:flex-col 2xl:bg-rose-400' >
          <div>
            <input className='focus:outline-none' type="text" placeholder='First Name' />
            <input className='focus:outline-none' type="text" placeholder='Last Name' />
          </div>
          <input className='focus:outline-none' type='email' placeholder='Email' />
          <input className='focus:outline-none' type="number" placeholder='Phone' />
          <div>
            <input className='focus:outline-none' type="password" placeholder='Password' />
            <input className='focus:outline-none' type="password" placeholder='Confirm Password' />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </section>
    </Fragment>
  )
}

export default EditSection