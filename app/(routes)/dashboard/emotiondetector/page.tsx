import React from 'react'
import EmotionDetector  from "../_components/MoodDetector"
import { Textarea } from "@/components/ui/textarea"
const page = () => {
  return (
    <>
 
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    <div className=''>
      <h1 className='text-center'>Lets detect your emotion with cam/text</h1>
      <div className='flex flex-row'>
         <EmotionDetector></EmotionDetector>
        <form>

         

          <Textarea placeholder="Type your message here." />
        </form>

      </div>
       
    </div>
       </>
  )
}

export default page
