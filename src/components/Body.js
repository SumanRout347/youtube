import React from 'react'
import Sidebar from './Sidebar'
import SliderSidebar from './SliderSidebar'
import { Outlet } from 'react-router-dom'

const Body = () => {
    
  return (
    <div className='flex md:gap-5'>
        <Sidebar/>
        <SliderSidebar/>
        <Outlet/>
        
    </div>
  )
}

export default Body