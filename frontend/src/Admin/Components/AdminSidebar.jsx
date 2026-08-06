import React, { useEffect, useState } from 'react'
import { FaDatabase } from 'react-icons/fa'
import { FaChartSimple, FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import axiosInstance from '../../services/axiosInstance'



function AdminSidebar() {
    const [adminData,setAdminData] = useState({})
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            const userData = JSON.parse(sessionStorage.getItem("user"))
            setAdminData(userData)
        }
    },[])
    return (
        <>
            <div className="bg-blue-100 md:min-h-screen h-full py-10">
                {/* image */}
                <div className="flex justify-center">
                    <img src={`${axiosInstance.defaults.baseURL}/uploads/${adminData?.profileImage}`} className='h-25 rounded-full' alt="" />
                </div>
                {/* name */}
                <h3 className="text-xl font-bold my-5 text-center">{adminData.username}</h3>
                {/* links */}
                <div className="mt-10 flex flex-col justify-center items-center">
                    <div className="mt-3">
                        <Link to={'/admindashboard'} className='flex items-center '> <FaChartSimple className='me-2' /> Dashboard</Link>
                    </div>
                    <div className="mt-3">
                        <Link to={'/adminresources'} className='flex items-center '> <FaDatabase className='me-2' /> Collections</Link>
                    </div>
                    <div className="mt-3">
                        <Link to={'/adminsettings'} className='flex items-center '> <FaGear className='me-2' /> Settings</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar