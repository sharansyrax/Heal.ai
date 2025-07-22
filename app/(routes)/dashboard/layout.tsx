import React from 'react'
import Appheader from './_components/Appheader';
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      
      <Appheader></Appheader>
      {children}
    </div>
  )
}

export default layout
