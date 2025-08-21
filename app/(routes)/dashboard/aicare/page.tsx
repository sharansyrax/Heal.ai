import React from 'react'
import HistoryList from '../_components/HistoryList'
import { Button } from '@/components/ui/button'
import {DoctorsAgentList} from '../_components/DoctorsAgentList'
import { Dialog } from '@radix-ui/react-dialog'
import Dialogbox from '../_components/dialogbox'

const page = () => {
  return (
    <div>
      <div className="fixed inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
</div>
      <div className='flex justify-between items-center'>
     <h2 className='font-bold text-2xl text-purple-400'>My Dashboard</h2>
    <Dialogbox></Dialogbox>
    </div>
     <HistoryList></HistoryList>
     <DoctorsAgentList></DoctorsAgentList>
    </div>
 
  )
}

export default page
