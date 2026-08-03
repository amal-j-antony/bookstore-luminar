import React, { useEffect, useState } from 'react'
import Footer from '../../common/Footer';
import Preloader from '../../common/Preloader';
import AdminHeader from '../Components/AdminHeader';
import AdminSidebar from '../Components/AdminSidebar';


function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])
    return (
        <>
        
        {
            isLoading ? <Preloader /> : 
            <>
                <AdminHeader/>
                <div className="md:grid grid-cols-5 gap-2">
                    <div className="col-span-1">
                        <AdminSidebar/>
                    </div>
                    <div className="col-span-4"></div>
                </div>
            
            </>}
        
        
        </>
    )
}

export default AdminDashboard