import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
function RootLayout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout