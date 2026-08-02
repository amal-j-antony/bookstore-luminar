import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { FaEye, FaBackward } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { viewBookAPI } from '../../services/allAPI.JS';
import axiosInstance from '../../services/axiosInstance';


function ViewBook() {
  const { id } = useParams()
  console.log(id);
  const [viewBook, setViewBook] = useState({})

  const getBookDetails = async () => {
    try {
      const result = await viewBookAPI(id)
      console.log(result);
      if (result?.status == 200) {
        console.log("success");
        setViewBook(result.data)
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getBookDetails()
  }, [])

  const [open, setOpen] = useState(false)
  return (
    <>
      <Header />
      <div className="grid grid-cols-4 m-10 p-10 border border-gray-800">
        <div className="col-span-1">
          <img src={viewBook.imageURL} className='h-' alt="" />
        </div>
        <div className="col-span-3">
          <div className="flex justify-between">
            {viewBook.bookTitle}
            <button onClick={() => setOpen(!open)} className='me-5 cursor-pointer'><FaEye /></button>
          </div>
          <h2 className='text-blue-600 font-bold text-xl my-5' >{viewBook.author}</h2>
          <div className="grid grid-cols-3 gap-5 my-10">
            <p className='font-bold' >Publisher: {viewBook.publisher}</p>
            <p className='font-bold' >Language: {viewBook.language}</p>
            <p className='font-bold' >No. of Pages: {viewBook.totalPages}</p>
            <p className='font-bold' >Category: {viewBook.category}</p>
            <p className='font-bold' >ISBN: {viewBook.isbn}</p>
            <p className='font-bold' >Original Price: {viewBook.originalPrice}</p>
            <p className='font-bold' >Seller: {viewBook.sellerEmail}</p>
          </div>
          <div className="text-lg">
            Abstract: {viewBook.abstract}
          </div>
          <div className="flex justify-end p-5 gap-5 ">
            <Link to={"/books"} className="flex gap-2 bg-blue-900 font-bold p-2 text-white " ><FaBackward /> Back</Link>
            <button className='bg-green-900 p-2 font-bold text-white'>Buy Rs{viewBook.discountPrice}</button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div className={open ? "fixed opacity-100 top-0 w-full h-full flex justify-center items-center bg-[rgb(0,0,0,0.5)]" : "opacity-0"}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white w-250 h-full rounded-2xl">
            <div className="flex justify-between px-10 py-5 bg-black text-white">
              <h3>Book Images</h3>
              <button onClick={() => setOpen(false)} >X</button>
            </div>
            <p className='text-blue-600'>Camera click of the book in the hand of the seller</p>

            {
              viewBook?.uploadImages?.length == 0 ?
              <p className='text-red-500'>User uploaded book images unavailable</p>
              :
              <>
                {
                  viewBook?.uploadImages?.map((item, index) => (
                    <img key={'asssfff'+index} src={`${axiosInstance.defaults.baseURL}/uploads/${item}`} alt="" />
                  ))
                }
              </>
            }
            <div className="flex flex-wrap justify-center py-5 h-30">
              
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ViewBook