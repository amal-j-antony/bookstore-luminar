import React from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function AdminHeader() {
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear("user")
        sessionStorage.clear("token")
        setTimeout(() => {
            navigate('/login')
            toast.success("Logout succeses")
        }, 1000)
    }
    return (
        <>
            <div className="flex justify-between items-center p-3 md:px-20">
                {/* logo */}
                <div className="flex items-center">
                    <img src="/stack-of-books.png" width={'50px'} height={'50px'} alt="" />
                    <h1 className="text-2xl font-bold ms-2">BOOKSTORE</h1>
                </div>
                {/* logout */}
                <button onClick={handleLogout} className="flex items-center px-3 py-3 bg-black text-white rounded border border-black hover:bg-white hover:text-black">
                    logout <FaPowerOff className='ms-2' />
                </button>
            </div>
            {/* header marquee */}
            <div className="w-full p-3 bg-black text-white">
                <marquee behavior="" direction="">Welcome Admin, You're all set to manage and monitor the system. Lets get into work</marquee>
            </div>
        </>
    )
}

export default AdminHeader