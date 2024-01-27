import React from 'react'
import Hero from './Hero'

const Banner = () => {
  return (
    <div className='pt-10 max-w-6xl mx-auto text-gray-50 '>
      <div className='mx-4 sm:mx-6 lg:mx-0'>
        <div className='flex flex-col sm:flex-row  items-center justify-between gap-4'>
          <div className='text-center sm:text-left w-full sm:w-4/5'>
            <h1 className='font-bold text-4xl lg:text-5xl pb-4'>
              We make it easier
            </h1>
            <h4 className='text-base sm:text-lg font-bold sm:font-bold capitalize '>
              Secured and Fast found-raising
            </h4>
            <p className='text-sm sm:text-base'>
              Experience the power of decentralized technology with GiMe a Hand.
              Your one-stop-shop for all ticket needs. The quickest way to book
              tickets.
            </p>
            <Hero />
          </div>
          <img
            src='/image.png'
            alt='fanacial-wallet'
            className='order-first sm:order-last '
          />
        </div>
      </div>
    </div>
  )
}

export default Banner