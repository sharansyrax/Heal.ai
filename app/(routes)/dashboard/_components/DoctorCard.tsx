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
    <div className='border-white shadow-md p-2 w-40 h-90  md:w-70 md:h-105 flex items-center flex-col  rounded-2xl
    bg-gradient-to-t from-white-100 to-purple-200
      '>
       <img
        src={"/"+doctorAgent.imageUrl}
        alt={doctorAgent.specialist}
      className="w-full h-[250px] rounded-xl "
      />
      <h2 className='font-bold mt-1 text-lg text-purple-500'>{doctorAgent.specialist}</h2>
   
{/* Mobile only */}
<Button variant="ghost" className=" mt-3 flex items-center  text-sm text-white md:hidden bg-purple-500 hover:bg-purple-400">
  Consult
</Button>

{/* Desktop only */}
<Button variant="ghost" className=" mt-2  hidden md:flex bg-purple-500 hover:bg-purple-400 text-white">
  Consult  <ArrowRight className="ml-1" />
</Button>


<p className="hidden mt-4 md:block md:line-clamp-2 text-sm text-purple-400 ">
  {doctorAgent.description}
</p>

    
    </div>
  )
}

export default DoctorCard
