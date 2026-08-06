import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader';
import AdminSidebar from '../Components/AdminSidebar';
import { getAllBooksAdminAPI } from '../../services/allAPI.JS';
import { approveBookAPI } from '../../services/allAPI.JS';
import { toast } from 'react-toastify';
import { getUsersAPI } from '../../services/allAPI.JS';
import axiosInstance from '../../services/axiosInstance';


function AdminResources() {
  const [tab, setTab] = useState("books")
  const [users, setUsers] = useState([])
  const [allBooks, setAllBooks] = useState([])
  console.log(allBooks);
  console.log(users);


  const getAllBooks = async () => {
    try {
      const result = await getAllBooksAdminAPI()
      if (result.status == 200) {
        setAllBooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllUsers = async () => {
    try {
      const result = await getUsersAPI()
      if (result.status == 200) {
        setUsers(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const tabStyle = (val) => {
    if (tab == val) {
      return "px-4 py-3 border-gray-200 border-l border-t border-r rounded cursor-pointer whitespace-nowrap"
    } else {
      return "px-4 py-3 border-gray-200 border-b rounded cursor-pointer whitespace-nowrap"
    }
  }

  const approveBook = async (bookID) => {
    try {
      const result = await approveBookAPI(bookID)
      if (result.status == 200) {
        toast.success("Book Approved")
        getAllBooks()
      } else {
        toast.error('Something went wrong, please try again')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { getAllBooks(), getAllUsers() }, [])

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* Sidebar */}
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-4">
          <div className="p-4 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
              All Resources
            </h1>

            {/* Tabs */}
            <div className="flex justify-center items-center my-8 font-medium text-sm md:text-lg overflow-x-auto">
              <p onClick={() => setTab("books")} className={tabStyle("books")}>
                Books
              </p>
              <p onClick={() => setTab("users")} className={tabStyle("users")}>
                Users
              </p>
            </div>

            {/* Book Contents */}
            {tab == "books" &&
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
                {/* Duplicate according to books */}

                {allBooks.length > 0 ?
                  allBooks.map((item, index) => (
                    <div key={"acc" + index} className="shadow rounded p-3">
                      <img
                        className="w-full h-72 object-cover"
                        src={item.imageURL}
                        alt="book"
                      />

                      <div className="flex flex-col justify-center items-center mt-4">
                        <h2 className="text-blue-700 font-bold text-xl">
                          {item.author}
                        </h2>

                        <h3 className="text-lg text-center">
                          {item.bookTitle}
                        </h3>

                        <p className="font-bold text-red-500">
                          $ {item.discountPrice}
                        </p>

                        {item.status == "Pending" ?
                          <button onClick={() => approveBook(item?._id)} className="bg-green-600 text-white p-2 mt-3 w-full rounded">
                            APPROVE
                          </button>
                          :
                          <img
                            className="w-24 mt-3"
                            src="https://static.vecteezy.com/system/resources/previews/016/774/415/large_2x/green-check-mark-icon-on-transparent-background-free-png.png"
                            alt="check mark icon"
                          />}
                      </div>
                    </div>
                  ))
                  :
                  <div className="flex items-center justify-center text-center text-lg md:text-xl font-bold p-4">
                    Sorry!!! No books added yet..
                  </div>}
              </div>
            }

            {/* User Contents */}
            {
              tab == "users" &&
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-8">
                {/* Duplicate according to users */}

                {users.length > 0 ?
                  <>
                    {users?.map((item, index) => (
                      <div key={"aslkdfj"+index} className="rounded bg-gray-200 p-4">
                        <p className="text-red-500 font-bold text-md">
                          ID : {item._id}
                        </p>

                        <div className="flex mt-3 items-center">
                          <img
                            className="w-20 h-20 rounded-full object-cover"
                            src={`${axiosInstance.defaults.baseURL}/uploads/${item.profileImage}`}
                            alt="user"
                          />

                          <div className="flex flex-col ml-3 w-full">
                            <h4 className="text-blue-500 font-bold text-md">
                              {item.username}
                            </h4>

                            <p className="text-xs break-all">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                  :
                  <div className="flex items-center justify-center text-center text-lg md:text-xl font-bold p-4">
                    Sorry!!! Currently no users are registered...
                  </div>
                }


              </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminResources