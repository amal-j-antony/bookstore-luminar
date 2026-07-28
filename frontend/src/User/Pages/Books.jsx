import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'


function Books() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center my-3">
        <h1 className='text-3xl font-bold my-5' >ALL BOOKS</h1>
        <div className="flex my-5">
          <input type="text" placeholder='Search Books By Title...!' className='p-2 border border-gray-200 w-100' />
          <button className='p-2 bg-blue-800 text-white'>Search</button>
        </div>
      </div>

      <div className="grid grid-cols-4 p-5 px-40 my-10">
        <div className="col-span-1">
          <h1>Filter</h1>
          <div className="flex gap-5">
            <input type="radio" name="filter" id="All" />
            <label htmlFor="All">All</label>
          </div>
          <div className="flex gap-5">
            <input type="radio" name="filter" id="history" />
            <label htmlFor="history">History</label>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 w-full">
            <div className="shadow-lg rounded p-3 m-4">
              <img src="https://m.media-amazon.com/images/I/51LTCXyBRwL._SY445_SX342_FMwebp_.jpg" className='w-full h-[350px]' alt="" />
              <div className='flex flex-col items-center mt-4'>
                <h2 className="font-bold text-blue-500">James Clear</h2>
                <h2 className='font-bold'>Atomic Habits</h2>
                <p className='text-red-500'>$18.99</p>
                <Link to={`/view/12/book`} className="p-3 bg-blue-800 text-white mt-2" >View Book</Link>
              </div>
            </div>
            <div className="text-center my-5 font-bold">Book Not Found</div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen flex justify-center items-center flex-col gap-10">
        <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3ltNDZ4NGhnbWk3Yng3OHJ4amtzcWlteDByY21iZjhibTM5ZmU3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XuslzM4IM98VCx8ko4/giphy.gif" alt="" />
        <p>PLease <Link to={"/login"} className='text-blue-600 underline' >Login</Link> to explore more</p>
      </div>
    </>
  )
}

export default Books