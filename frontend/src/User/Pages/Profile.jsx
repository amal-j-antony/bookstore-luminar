import React, { useState } from 'react'
import Header from '../Components/Header'
import { FaEdit } from 'react-icons/fa'
import { MdVerified } from "react-icons/md";
import UploadBooks from '../Components/UploadBooks';
import BookStatus from '../Components/BookStatus';
import PurchaseHistory from '../Components/PurchaseHistory';
import EditProfile from '../Components/EditProfile';
import axiosInstance from '../../services/axiosInstance';
import { useEffect } from 'react';

function Profile() {
  const [tab, setTab] = useState("upload")
  const [userData, setUserData] = useState({})
  

  useEffect(() => {
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
  }, [])

  return (
    <>
      <Header />
      <div className="h-50 bg-black">
      </div>
      <img src={
        userData.profileImage? `${axiosInstance.defaults.baseURL}/uploads/${userData.profileImage}` 
        : "https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669460/samples/animals/cat.jpg"
      } className='-my-25 h-50 w-50 object-cover ms-32 border-10 border-white rounded-full' alt="" />
      <div className="w-full flex justify-center items-center mt-30">
        <div className='container flex flex-col'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl flex items-center gap-2'>{userData?.username} <MdVerified /> </h1>
            <EditProfile />
          </div>
          <div className="pt-5 font-bold">Bookstore User</div>
          <p className='py-5 text-justify'>{userData?.bio}</p>

          <div className="flex justify-center">
            <button onClick={() => setTab("upload")} className={tab == "upload" ? ' border-l border-t border-r p-5 cursor-pointer' : 'border-b p-5 cursor-pointer'}>Upload Book</button>
            <button onClick={() => setTab("status")} className={tab == "status" ? 'border-l border-t border-r  p-5 cursor-pointer' : 'border-b p-5 cursor-pointer'}>Upload Books Status</button>
            <button onClick={() => setTab("history")} className={tab == "history" ? 'border-l border-t border-r  p-5 cursor-pointer' : 'border-b p-5 cursor-pointer'}>Purchase History</button>
          </div>

          {
            tab == "upload" &&
            <div className="flex justify-center py-10 text-xl mt-10">
              <UploadBooks />
            </div>
          }

          {
            tab == "status" &&
            <div className="flex justify-center py-10 text-xl mt-10">
              <BookStatus />
            </div>
          }

          {
            tab == "history" &&
            <div className="flex justify-center py-10 text-xl mt-10">
              <PurchaseHistory />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Profile