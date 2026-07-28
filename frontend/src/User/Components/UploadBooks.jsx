import React from 'react'
import { BsCloudUploadFill } from "react-icons/bs";
import { MdCloudUpload } from "react-icons/md";

function UploadBooks() {
    return (
        <>
            <div className="bg-gray-300 p-10">
                <h1 className='text-center text-3xl'>Upload book details</h1>
                <div className="grid grid-cols-2 gap-5 mt-10 w-full">
                    <div className="">
                        <input type="text" placeholder='Book title' className='w-full bg-white p-2 my-5' />
                        <input type="text" placeholder='Author' className='w-full bg-white p-2 mb-5' />
                        <input type="text" placeholder='Book Cover' className='w-full bg-white p-2 mb-5' />
                        <input type="text" placeholder='Total Pages' className='w-full bg-white p-2 mb-5' />
                        <input type="text" placeholder='Original Price' className='w-full bg-white p-2 mb-5' />
                        <input type="text" placeholder='Disocunt Price' className='w-full bg-white p-2 mb-5' />
                        <textarea type="text" placeholder='Abstract' className='w-full bg-white p-2 mb-5' />
                    </div>
                    <div className="">
                        <input type="text" placeholder='Book title' className='w-full bg-white p-2 my-5' />
                        <input type="text" placeholder='Author' className='w-full bg-white p-2 mb-5' />
                        <input type="text" placeholder='Book Cover' className='w-full bg-white p-2 mb-5' />
                        <input type="text" placeholder='Total Pages' className='w-full bg-white p-2 mb-5' />
                        <label htmlFor="bookImages" className='w-full flex justify-center p-10'>
                            <input type="file" hidden id='bookImages' />
                            <MdCloudUpload className='text-[200px] cursor-pointer' />
                        </label>
                        <div className="flex justify-center items-center">
                            <img src="https://picsum.photos/200" alt="" className='w-20 pe-5' />
                            <img src="https://picsum.photos/200" alt="" className='w-20 pe-5' />
                            <img src="https://picsum.photos/200" alt="" className='w-20 pe-5' />
                            <label htmlFor="bookImages" className='flex justify-center p-3'>
                                <input type="file" hidden id='bookImages' />
                                <MdCloudUpload className='text-8xl cursor-pointer' />
                            </label>
                        </div>
                        <div className="flex justify-center gap-5">
                            <button className='text-white bg-green-500 py-2 px-3'>Reset</button>
                            <button className='text-white bg-blue-500 py-2 px-3'>Add Book Details</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UploadBooks