import React from 'react'
import Index from "../../index"
import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'
import "./main.css"

const Main = () => {
  return (
    <Index.Box className='header-sidebar'>
      <Index.Box> <Sidebar /></Index.Box>
      <Index.Box>  <Header /></Index.Box>


    </Index.Box>
  )
}

export default Main
