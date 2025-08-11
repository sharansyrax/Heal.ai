import React from 'react'
import HistoryList from '../_components/HistoryList'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div>
       <div className='flex justify-between items-center'>
     <h2 className='font-bold text-2xl'>My Dashboard</h2>
     <Button className='purple'>Consult the AI doctor</Button>
    </div>
     <HistoryList></HistoryList>
    </div>
 
  )
}

export default page
