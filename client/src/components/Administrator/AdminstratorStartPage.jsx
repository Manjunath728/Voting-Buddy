import React from 'react'
import { Outlet } from 'react-router-dom'
import BlankHeader from '../Blanks/BlankHeader'
import AdministratorHeader from './AdministratorHeader'

function AdminstratorStartPage() {
  return (
    <> <AdministratorHeader/>
    <Outlet/>
    </>
  )
}

export default AdminstratorStartPage