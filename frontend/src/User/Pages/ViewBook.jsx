import React, { useState } from 'react'
import Header from '../Components/Header'
import { FaEye, FaBackward } from "react-icons/fa";
import { Link } from 'react-router-dom';


function ViewBook() {
  const [open,setOpen] = useState(false)
  return (
    <>
      <Header />
      <div className="grid grid-cols-4 m-10 p-10 border border-gray-800">
        <div className="col-span-1">
          <img src="https://m.media-amazon.com/images/I/51LTCXyBRwL._SY445_SX342_FMwebp_.jpg" className='h-' alt="" />
        </div>
        <div className="col-span-3">
          <div className="flex justify-between">
            Sapiens: A Brief History of Humankind
            <button onClick={() => setOpen(!open)} className='me-5 cursor-pointer'><FaEye /></button>
          </div>
          <h2 className='text-blue-600 font-bold text-xl my-5' >Yuval Noah Harari</h2>
          <div className="grid grid-cols-3 gap-5 my-10">
            <p className='font-bold' >Publisher: Harper</p>
            <p className='font-bold' >Language: English</p>
            <p className='font-bold' >No. of Pages: 498</p>
            <p className='font-bold' >Category: History</p>
            <p className='font-bold' >ISBN: 9780062316097</p>
            <p className='font-bold' >Original Price: $35</p>
            <p className='font-bold' >Seller: max@gmail.com</p>
          </div>
          <div className="text-lg">
            Abstract: Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis totam rerum incidunt. Saepe quis omnis earum voluptatum consequatur. Aperiam doloremque fuga natus magnam atque eaque veritatis recusandae consectetur explicabo expedita?
          </div>
          <div className="flex justify-end p-5 gap-5 ">
            <Link to={"/books"} className="flex gap-2 bg-blue-900 font-bold p-2 text-white " ><FaBackward/> Back</Link>
            <button className='bg-green-900 p-2 font-bold text-white'>Buy $199</button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div className={ open ? "fixed opacity-100 top-0 w-full h-full flex justify-center items-center bg-[rgb(0,0,0,0.5)]" : "opacity-0" }>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white w-250 h-full rounded-2xl">
            <div className="flex justify-between px-10 py-5 bg-black text-white">
              <h3>Book Images</h3>
              <button onClick={() => setOpen(false)} >X</button>
            </div>
            <p className='text-blue-600'>Camera click of the book in the hand of the seller</p>
            <div className="flex flex-wrap justify-center py-5 h-30">
              <p className='text-red-500'>User uploaded book images unavailable</p>
            </div>
          </div>
        </div>
      
      </div>
    </>
  )
}

export default ViewBook