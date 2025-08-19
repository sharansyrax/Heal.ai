import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

type DoctorAgent={
    id:number,
    specialist:string,
    description:string,
    imageUrl:string,
    agentPrompt:string
}
type props ={
    doctorAgent:DoctorAgent
}
const DoctorCard = ({doctorAgent}:props) => {
  return (
    <div className='border-white shadow-md p-4 w-60 h-100 flex items-center flex-col '>
       <img
        src={"/"+doctorAgent.imageUrl}
        alt={doctorAgent.specialist}
      className="w-full h-[250px] rounded-xl "
      />
      <h2 className='font-bold mt-1 text-lg text-purple-400'>{doctorAgent.specialist}</h2>
    <p className='line-clamp-2 text-sm text-purple-300'>{doctorAgent.description}</p>
    <Button className='w-full mt-2'>Start consultation <ArrowRight></ArrowRight></Button>
    </div>
  )
}

export default DoctorCard
