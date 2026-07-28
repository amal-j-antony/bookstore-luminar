import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

function EditProfile() {
    const [offCanvas, setOffCanvas] = useState(false)
    return (
        <>
            <div>
                <button onClick={()=>setOffCanvas(true)} className='flex items-center gap-2 text-xl border p-2 rounded-xl hover:bg-black hover:text-white duration-500 cursor-pointer'>
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
                                <input type="file" className='hidden' id='uploadProfileImage' />
                                <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1783783482/user_s1wtzw.png" className='w-25 h-25' alt="" />
                                <div className='bg-black text-white px-3 py-2 rounded absolute right-0 top-20'><FaEdit className='' /></div>
                            </label>
                        </div>

                        <div className="mt-2 mb-3 w-full px-5">
                            <input type="text" placeholder='UserName' className='w-full border border-gray-300 rounded p-2' />
                        </div>

                        <div className="mt-2 mb-3 w-full px-5">
                            <input type="text" placeholder='UserName' className='w-full border border-gray-300 rounded p-2' />
                        </div>

                        <div className="mt-2 mb-3 w-full px-5">
                            <input type="text" placeholder='UserName' className='w-full border border-gray-300 rounded p-2' />
                        </div>

                        <div className="mt-2 mb-3 w-full px-5">
                            <input type="text" placeholder='UserName' className='w-full border border-gray-300 rounded p-2' />
                        </div>

                        <div className='flex justify-end w-full px-5 mt-5 gap-5'>
                            <button className="bg-yellow-600 text-white py-2 px-3">Reset</button>
                            <button className="bg-green-600 text-white py-2 px-3">Update</button>
                        </div>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default EditProfile