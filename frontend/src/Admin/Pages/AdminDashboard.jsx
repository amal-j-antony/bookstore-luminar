import React, { useEffect, useState } from 'react'
import Footer from '../../common/Footer';
import Preloader from '../../common/Preloader';


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
            <div>AdminDashboard</div>}
        
        
        </>
    )
}

export default AdminDashboard