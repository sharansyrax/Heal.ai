import { aidoctors } from '@/shared/list'
import React from 'react'
import DoctorCard from './DoctorCard'

export const DoctorsAgentList = () => {
  return (
    <div className='mt-10'>

      <h2 className='font-bold text-xl text-[#9f0ee2]'>AI doctors</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
        {aidoctors.map((doctor,index)=>{
            return <div key={index}>
                <DoctorCard doctorAgent={doctor}></DoctorCard>
                </div>
        })}
      </div>
    </div>
  )
}

