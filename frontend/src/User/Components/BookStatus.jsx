import React from 'react'
import { getBooksUploadedAPI } from '../../services/allAPI.JS'
import { useState } from 'react'
import { useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';

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

  useEffect(() => {
    getUploaded()
  }, [])
  return (
    <>
      <div className="p-10 my-15 shadow-rounded">
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
                              <img className='h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ic-g5bD0fLLP2yj6XZ4hCpg95xMEvmctVmDkhCrlR42flgUhwcbzueA&s=10" alt="" />
                              : item?.status == 'Approved' ? 
                              <img className='h-20' src="https://static.vecteezy.com/system/resources/thumbnails/007/957/428/small/grunge-pending-word-rubber-stamp-pending-red-sign-sticker-set-grunge-vintage-square-label-illustration-isolated-on-white-background-vector.jpg" alt="" />
                              : <img className='h-20' src="https://static.vecteezy.com/system/resources/thumbnails/007/249/018/small_2x/sold-stamp-sign-with-grunge-effect-on-white-background-free-vector.jpg" alt="" />
                          }

                          
                          
                        </div>

                      </div>
                      <div className="w-full px-4 mt-4">
                        <img src={item.imageURL} alt="product image" />
                        <button className="bg-red-600 text-white p-2 rounded float-end mt-5">Delete</button>
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