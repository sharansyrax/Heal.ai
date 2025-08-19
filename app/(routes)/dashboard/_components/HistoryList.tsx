"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'

const HistoryList = () => {
  const [historyList,setHistoryList]=useState([]);
  return (
    <div>
        {
          historyList.length==0  ?
          <div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2 mt-3 bg-gradient-to-r from bg-purple-50 bg-purple-100'> 
             
              <h2 className='font-bold text-xl text-purple-400'> No Recent Consultations</h2>
              <Button className='mt-2 bg-purple-500 hover:bg-purple-400'>Start consultation</Button>
          </div>
          :
          <div>
            List
            </div> 
        }
    </div>
  )
}

export default HistoryList
