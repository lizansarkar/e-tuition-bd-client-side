import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/reusable/Navbar'
import Footer from '../components/reusable/Footer'

export default function RootLayout() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
