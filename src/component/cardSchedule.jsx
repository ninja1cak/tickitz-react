import React from 'react'
import ebv from '../assets/img/homepage/ebv.png'
import hiflix from '../assets/img/homepage/hiflix.png'
import cineone from '../assets/img/homepage/cineone.png'

function cardSchedule() {
  return (
    <>
        <div className='bg-white p-6 rounded-lg mt-10 w-[100%] max-w-sm'>
            <div className='border-b border-gray-300 flex flex-col gap-4 items-center text-center sm:flex-row sm:text-start sm:gap-10  mb-5 pb-5 '>
                <img src={ebv} alt="logo ebv" className='w-20  sm:w-28 ' />
                <div>
                    <p className='hidden font-semibold text-2xl sm:block'>ebv.id</p>
                    <p className=' text-gray-300 tracking-wider sm:text-sm sm:tracking-widest'>Whatever street No.12, South Purwokerto</p>
                </div>
     
            </div>
            <div>
                <div className='flex flex-wrap gap-4 text-gray-500 tracking-wide text-sm justify-between mb-5'>
                    <p>08:30am</p>
                    <p>08:30am</p>
                    <p>08:30am</p>
                    <p>08:30am</p>
                    <p>08:30am</p>
                    <p>08:30am</p>
                    <p>08:30am</p>
                    <p>08:30am</p>
                </div>
                <div className='flex justify-between tracking-wider mb-8'>
                    <p className=' text-gray-500'>Price</p>
                    <p className='font-bold'>$10.00/seat</p>
                </div>
                <button className='tracking-wider bg-primary text-white text-lg w-[100%] h-10 rounded-lg shadow-md shadow-primary'>Book now</button>
            </div>
        </div>
    </>
  )
}

export default cardSchedule