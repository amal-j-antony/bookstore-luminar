import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { updateUserProileAPI } from '../../services/allAPI.JS'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../services/axiosInstance'
function EditProfile() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState("")
    const [offCanvas, setOffCanvas] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [preview, setPreview] = useState("")
    const [existingUserImage, setExistingUserImage] = useState('')
    const [userData, setUserData] = useState({
        username: "",
        // email: "",
        password: "",
        cPassword: '',
        profileImage: '',
        bio: '',
        email: ''
    })
    console.log(userData);


    const inputEnter = (e, value) => {
        if (value == "cPassword") {
            setUserData({
                ...userData,
                [value]: e.target.value
            })
            userData.password == e.target.value ? setPasswordMatch(true) : setPasswordMatch(false)

        } else if (value == "profileImage") {
            console.log(e.target.files[0]);
            const imageFile = e.target.files[0]
            if (imageFile.type.startsWith("image/")) {
                setUserData({
                    ...userData,
                    profileImage: imageFile
                })
                const imageURL = URL.createObjectURL(imageFile)
                setPreview(imageURL)
            }
        } else {
            setUserData({
                ...userData,
                [value]: e.target.value
            })
        }
    }

    const handleUpdate = async () => {
        const { username, password, cPassword, bio, profileImage } = userData
        if (!username || !password || !cPassword || !bio) {
            toast.info("Please fill the form completely")
        } else if (passwordMatch) {
            // toast.success("Ready for API")
            const reqBody = new FormData()
            for (let key in userData) {
                if (key != profileImage) {
                    reqBody.append(key, userData[key])
                } else {
                    reqBody.append("profileImage", profileImage)
                }
            }
            const result = await updateUserProileAPI(userId, reqBody)
            console.log(result);
            if (result.status == 200) {
                toast.success("Proile updated successully")
                sessionStorage.setItem("user", JSON.stringify(result.data))
                setTimeout(() => {
                    sessionStorage.clear()
                    navigate("/login")
                }, 2500)

            }
        }
    }

    const handleReset = () => {
        const data = JSON.parse(sessionStorage.getItem("user"))
        setUserData({
            password: "",
            cPassword: '',
            username: data?.username,
            bio: data?.bio,
            profileImage: data?.profileImage
        })
        setPreview('')
        setPasswordMatch(true)
    }

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            const data = JSON.parse(sessionStorage.getItem("user"))
            console.log(data);
            setUserData({
                ...userData,
                username: data?.username,
                bio: data?.bio,
                profileImage: data?.profileImage
            })
            setUserId(data._id)
        }
    }, [])
    return (
        <>
            <div>
                <button onClick={() => {
                    setOffCanvas(true)
                    handleReset()
                }} className='flex items-center gap-2 text-xl border p-2 rounded-xl hover:bg-black hover:text-white duration-500 cursor-pointer'>
                    Edit
                    <FaEdit />
                </button>
            </div>
            <div className={offCanvas ? "fixed block inset-0 bg-[rgb(0,0,0,0.5)]" : "hidden"}>
                <div className="min-h-screen">
                    <div className="bg-white w-100 h-full rounded-2xl">
                        <div className="flex justify-between px-10 py-5 bg-black text-white">
                            <h3>Update User Profile</h3>
                            <button onClick={() => setOffCanvas(false)} >X</button>
                        </div>
                        {/* body */}
                        <div className="flex justify-center items-center flex-col my-5">
                            <label htmlFor='uploadProfileImage' className='relative'>
                                <input onChange={(e) => inputEnter(e, "profileImage")} type="file" className='hidden' id='uploadProfileImage' />
                                {
                                    userData.profileImage ?
                                        <img src={preview ? preview : `${axiosInstance.defaults.baseURL}/uploads/${userData.profileImage}`} className='w-25 h-25 object-cover rounded-full' alt="" />
                                        :
                                        <img src={preview ? preview : "https://res.cloudinary.com/dwaaoyztz/image/upload/v1783783482/user_s1wtzw.png"} className='w-25 h-25 object-cover rounded-full' alt="" />
                                }
                                <div className='bg-black text-white px-3 py-2 rounded absolute right-0 top-20'><FaEdit className='' /></div>
                            </label>
                        </div>

                        <div className="mt-2 mb-3 w-full px-5">
                            <input onChange={(e) => inputEnter(e, "username")} value={userData.username} type="text" placeholder='UserName' className='w-full border border-gray-300 rounded p-2' />
                        </div>

                        <div className="mt-2 mb-3 w-full px-5">
                            <input onChange={(e) => inputEnter(e, "password")} value={userData.password} type="password" placeholder='password' className='w-full border border-gray-300 rounded p-2' />
                        </div>

                        <div className="mt-2 mb-3 w-full px-5">
                            <input onChange={(e) => inputEnter(e, "cPassword")} value={userData.cPassword} type="password" placeholder='confirm password' className='w-full border border-gray-300 rounded p-2' />
                            {
                                !passwordMatch && <p className='text-red-600'>Passwords do not match</p>
                            }
                        </div>

                        <div className="mt-2 mb-3 w-full px-5">
                            <input onChange={(e) => inputEnter(e, "bio")} value={userData.bio} type="text" placeholder='Enter BIo' className='w-full border border-gray-300 rounded p-2' />
                        </div>

                        <div className='flex justify-end w-full px-5 mt-5 gap-5'>
                            <button onClick={handleReset} className="bg-yellow-600 text-white py-2 px-3">Reset</button>
                            <button onClick={handleUpdate} className="bg-green-600 text-white py-2 px-3">Update</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default EditProfile