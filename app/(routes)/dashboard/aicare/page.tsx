import React from 'react'
import HistoryList from '../_components/HistoryList'
import { Button } from '@/components/ui/button'
import {DoctorsAgentList} from '../_components/DoctorsAgentList'
import { Dialog } from '@radix-ui/react-dialog'
import Dialogbox from '../_components/dialogbox'

const page = () => {
  return (
    <div>
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
