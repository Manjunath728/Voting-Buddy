import React from 'react'
import { Outlet } from 'react-router-dom'
import BlankHeader from './BlankHeader'

function BlankPage() {
  return (
   <>
   <BlankHeader/>
        <Outlet/>
   </>
  )
}

export default BlankPage