import React from 'react'
import Index from "../../index"
import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'
import "./main.css"
import { Outlet } from 'react-router-dom'


const Main = () => {
  return (
    <Index.Box className='header-sidebar'>
      <Index.Box> <Sidebar /></Index.Box>


      <Index.Box>
      <Index.Box>  <Header /></Index.Box>
      <Index.Box> <Outlet/>  </Index.Box>
      </Index.Box>
   


    </Index.Box>
  )
}

export default Main
