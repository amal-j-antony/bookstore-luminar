import React from 'react'
import { getBooksUploadedAPI } from '../../services/allAPI.JS'
import { useState } from 'react'
import { useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { deleteBookAPI } from '../../services/allAPI.JS';
import { toast } from 'react-toastify';

function BookStatus() {
  const [books, setBooks] = useState([])
  console.log(books);
  const getUploaded = async () => {
    try {
      const result = await getBooksUploadedAPI()
      if (result.status == 200) {
        setBooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBook = async (bookID) => {
    try {
      const result = await deleteBookAPI(bookID)
      if(result.status == 200){
        toast.success("Book deleted")
        getUploaded()
      }else{
        toast.error("Something went wrong")
      }

    } catch (error) {
      console.log(error);      
    }
  }

  useEffect(() => {
    getUploaded()
  }, [])
  return (
    <>
      <div className="p-10 shadow-rounded">
        {
          books.length > 0 ?
            <>
              {
                books.map((item, index) => (
                  <div key={"ooo" + index} className="p-5 rounded mt-4 bg-gray-100">
                    <div className="grid items-center grid-cols-[3fr_1fr]">
                      <div className="px-4">
                        <h1>{item.bookTitle}</h1>
                        <h2>{item.originalPrice}</h2>
                        <h3>{item.discountPrice}</h3>

                        <p><span className='font-semibold' >Abstract: </span>{item.abstract}</p>
                        <div className="flex mt-5">
                          {
                            item?.status == 'Pending' ?
                              <img className='h-30' src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1785737555/1-Photoroom_nk4qv7.png" alt="" />
                              : item?.status == 'Approved' ? 
                              <img className='h-30' src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1785737553/2-Photoroom_n8ykod.png" alt="" />
                              : <img className='h-30' src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1785737553/3-Photoroom_w2owhu.png" alt="" />
                          }                                                    
                        </div>

                      </div>
                      <div className="w-full px-4 mt-4">
                        <img src={item.imageURL}  alt="product image" />
                        <button onClick={()=>deleteBook(item._id)} className="bg-red-600 text-white p-2 rounded float-end mt-5 cursor-pointer">Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </>
            :
            <div className="font-bold text-xl p-5">You havent uploaded any books yet</div>
        }

      </div>
    </>
  )
}

export default BookStatus