import React from 'react'
import { FaDatabase } from 'react-icons/fa'
import { FaChartSimple, FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


function AdminSidebar() {
    return (
        <>
            <div className="bg-blue-100 md:min-h-screen h-fit py-10">
                {/* image */}
                <div className="flex justify-center">
                    <img src="https://picsum.photos/200" className='h-25 rounded-full' alt="" />
                </div>
                {/* name */}
                <h3 className="text-xl font-bold my-5 text-center">User Name</h3>
                {/* links */}
                <div className="mt-10 flex flex-col justify-center items-center">
                    <div className="mt-3">
                        <Link to={'/admindashboard'} className='flex items-center '> <FaChartSimple className='me-2' /> Dashboard</Link>
                    </div>
                    <div className="mt-3">
                        <Link to={'/adminresourses'} className='flex items-center '> <FaDatabase className='me-2' /> Collections</Link>
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