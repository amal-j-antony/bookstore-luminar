import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './common/Home'
import Contact from './common/Contact'
import Auth from './common/Auth'
import Books from './User/Pages/Books'
import ViewBook from './User/Pages/ViewBook'
import Profile from './User/Pages/Profile'
import AdminDashboard from './Admin/Pages/AdminDashboard'
import AdminResources from './Admin/Pages/AdminResources'
import AdminSettings from './Admin/Pages/AdminSettings'
import Pnf from './common/Pnf'
import Preloader from './common/Preloader'
import FakeHeader from './common/FakeHeader'
import 'animate.css';
import { ToastContainer } from 'react-toastify'

function App() {
  // const [isLoading, setIsLoading] = useState(true)
  //     useEffect(() => {
  //     setTimeout(() => {
  //       setIsLoading(false)
  //     }, 2000)
  //   }, [])






  return (
    <>


      <Routes>

        {/* common */}
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister />} />


        {/* users */}
        <Route path='/books' element={<Books />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/view/:id/book' element={<ViewBook />} />

        {/* admin */}
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/adminresources' element={<AdminResources />} />
        <Route path='/adminsettings' element={<AdminSettings />} />

        {/* pnf */}
        <Route path='/*' element={<Pnf />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}        
        theme="colored"        
      />
    </>
  )
}

export default App
