import React from 'react'
import Appheader from '../_components/Appheader';

const aicarelayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
       <div className='px-10 md:px-20 lg:px-40'>
              {children}
       </div>
    
    </div>
  )
}

export default aicarelayout
