import React from 'react'
import AdminHeader from '../Components/AdminHeader';
import AdminSidebar from '../Components/AdminSidebar';


function AdminResources() {
  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-5 gap-2">
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        <div className="col-span-4"></div>
      </div>
    </>
  )
}

export default AdminResources