import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSidebar'
import { FaPen } from 'react-icons/fa'
import axiosInstance from '../../services/axiosInstance'
import { toast } from 'react-toastify'
import { updateAdminAPI } from '../../services/allAPI.JS'
function AdminSettings() {
  const [adminData, setAdminData] = useState({})
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [preview, setPreview] = useState("")
  console.log(preview);
  

  const checkPassword = (e) => {
    setAdminData({ ...adminData, cPassword: e.target.value })
    adminData.password === adminData.cPassword ? setPasswordMatch(true) : setPasswordMatch(false)
  }

  const handleFile = (e) => {
    const imageFile = e.target.files[0]
    if (imageFile.type.startsWith('image/')) {
      setAdminData({ ...adminData, profileImage: imageFile })
      const imageURL = URL.createObjectURL(imageFile)
      setPreview(imageURL)
    }
  }

  const updateAdminProfile = async () => {
    const {username, password, profileImage , id} = adminData
    if(username && password && profileImage){
      const reqBody  = new FormData()
      for(let key in adminData){
        if(key != profileImage){
          reqBody.append(key,adminData[key])
        }else{
          reqBody.append("profileImage",profileImage)
        }
      }
console.log(id);

      const result = await updateAdminAPI(id,reqBody)
      console.log(result.data.details);
      if(result.status == 200){
        toast("Update success")
        const updatePayload = {}
        for(let key in result.data.details){
          if(key != "password"){
            updatePayload[key] = result.data.details[key]
          }                    
        }
        console.log(updatePayload);
        sessionStorage.setItem("user",JSON.stringify(updatePayload))
      }
      
    }else {
      toast("Please fill form completely")
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const data = JSON.parse(sessionStorage.getItem("user"))
      console.log(data._id);
      
      setAdminData({ username: data.username, profileImage: data.profileImage, id:data._id })
    }
  },[])
  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* Sidebar */}
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-4 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
            Settings
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text Part */}
            <div className="px-2 md:px-0">
              <h2 className="text-xl font-bold mb-5">Welcome, {adminData.username} 👋</h2>

              <p className="text-justify text-sm md:text-base leading-7">
                This is your personal administration space where you can manage
                your account details, system preferences, and platform roles
                with ease. From here, you can update essential information such
                as your username, password, contact details, and notification
                preferences — ensuring your access remains secure and
                personalized.
              </p>

              <h4 className="text-lg my-5 font-medium">
                🔧 What You Can Manage in This Section:
              </h4>

              <ul className="space-y-2 text-sm md:text-base">
                <li>
                  ✏️ Update personal details (name, email, role, profile
                  picture)
                </li>
                <li>🔐 Change or reset your password</li>
                <li>📢 Configure notification and alert preferences</li>
                <li>👥 Manage permissions based on assigned access level</li>
                <li>🧩 Customize dashboard visibility and layout</li>
              </ul>

              <p className="my-5 text-justify text-sm md:text-base leading-7">
                Your profile settings help ensure your administrative tools work
                the way you need them to — securely, efficiently, and with
                complete control. Thank you for keeping the platform organized
                and running smoothly. Continue managing, updating, and improving
                the system — one step at a time. 🚀📚
              </p>
            </div>

            {/* Edit Form */}
            <div className="flex justify-center items-center">
              <div className="w-full max-w-md bg-blue-100 rounded-lg shadow-lg p-6 md:p-8">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                  <label htmlFor="userProfile" className="cursor-pointer relative">
                    <input onChange={(e) => handleFile(e)} type="file" id="userProfile" hidden />

                    <img
                      src={preview ? `${preview}` : adminData?.profileImage ? `${axiosInstance.defaults.baseURL}/uploads/${adminData?.profileImage}` : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
                      alt="user"
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-gray-300 object-cover"
                    />

                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full"
                    >
                      <FaPen />
                    </button>
                  </label>

                  <p className="mt-4 text-yellow-600 text-sm text-center">
                    *Only accept image file
                  </p>
                </div>

                {/* Username */}
                <div className="mt-8">
                  <input
                    value={adminData.username}
                    onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                    type="text"
                    placeholder="Username"
                    className="w-full border border-gray-300 rounded p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* New Password */}
                <div className="mt-4">
                  <input
                    value={adminData.password}
                    onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                    type="password"
                    placeholder="New Password"
                    className="w-full border border-gray-300 rounded p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                  <input
                    value={adminData.cPassword}
                    onChange={(e) => checkPassword(e)}
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded p-3 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {passwordMatch && <p className="mt-3 text-yellow-600 text-sm text-center">
                  *Password and confirm password must be same
                </p>}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-8">
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-5 rounded transition">
                    RESET
                  </button>

                  <button onClick={() => updateAdminProfile()} className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded transition">
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSettings