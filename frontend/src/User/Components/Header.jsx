import React, { useState } from 'react'
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { IoMdLogOut, IoMdPerson, IoMdSettings } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from 'react'
import axiosInstance from '../../services/axiosInstance'

function Header() {
  const [toggle, setToggle] = useState(false)
  console.log(toggle);
  const [token, setToken] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [userData,setUserData] = useState({})

  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
    if (sessionStorage.getItem("user")) {
      const data = JSON.parse(sessionStorage.getItem("user"))
      console.log(data);
      setUserData({
        ...userData,
        username: data?.username,
        bio: data?.bio,
        profileImage: data?.profileImage,
        userID: data._id
      })
      
    }
  },[])

  return (
    <>
      <div className="grid grid-cols-3 py-3 px-10 ">
        {/* logo */}
        <Link to={"/"} className="flex">
          <img src="/stack-of-books.png" className='h-10' alt="" />
          <h1 className='ms-5 text-3xl flex md:hidden fonr-bold' >BookStore</h1>
        </Link>
        <Link to={"/"} className="hidden md:flex justify-center items-center">
          <h1 className='text-3xl font-bold'>BookStore</h1>
        </Link>
        <div className="hidden md:flex gap-3 justify-end">
          <FaFacebookSquare className='h-full text-2xl' />
          <FaInstagramSquare className='h-full text-2xl' />
          <FaSquareXTwitter className='h-full text-2xl' />
          {
            token ?
              <section onClick={()=>setDropdown(!dropdown)} className='relative'>
                <button  className='ms-5 text-xl flex items-center border border-black hover:bg-black hover:text-white rounded-full duration-500 cursor-pointer'>{
                  userData? 
                  <img src={`${axiosInstance.defaults.baseURL}/uploads/${userData.profileImage}`} className='rounded-full w-10' alt="" />
                  :
                  <IoMdPerson className='m-3' />
                  }</button>
                {
                  dropdown &&
                  <div className="absolute right-0  bg-slate-50 z-5 p-2">
                    <Link to={"/profile/12"} className='flex items-center gap-2 hover:bg-black hover:text-white duration-500 p-3 cursor-pointer' ><IoMdSettings/> Profile</Link>
                    <h1 className='flex items-center gap-2 hover:bg-black hover:text-white duration-500 p-3 cursor-pointer' ><IoMdLogOut/> Logout</h1>
                  </div>
                }
              </section>

              :
              <Link to={"/login"} className='ms-10 flex items-center border border-black hover:bg-black hover:text-white px-2 rounded'><IoMdPerson /> Login</Link>
          }
        </div>

      </div>

      <nav className='bg-black w-full text-white flex justify-between md:justify-center items-center p-5'>
        <GiHamburgerMenu onClick={() => setToggle(!toggle)} className='flex md:hidden' />

        <Link to={"/login"} className='ms-10 flex md:hidden items-center border border-black hover:bg-black hover:text-white px-2 rounded'><IoMdPerson /> Login</Link>
        <ul className='hidden md:flex gap-10 '>
          <li><Link className='text-xl' to={"/"}>Home</Link></li>
          <li><Link className='text-xl' to={"/books"}>Books</Link></li>
          <li><Link className='text-xl' to={"/contact"}>Contact</Link></li>
        </ul>
      </nav>
      <ul className={toggle ? ' max-md:block md:hidden gap-10 bg-black p-10 text-white animate__animated animate__fadeIn' : 'hidden '}>
        <li><Link className='text-xl' to={"/"}>Home</Link></li>
        <li><Link className='text-xl' to={"/books"}>Books</Link></li>
        <li><Link className='text-xl' to={"/contact"}>Contact</Link></li>
      </ul>
    </>
  )
}

export default Header
