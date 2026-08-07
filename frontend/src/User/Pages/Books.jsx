import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../services/allAPI.JS'
import { all } from 'axios'
import SearchContext, { ShareContext } from '../../contextShare/SearchContext'


function Books() {  
  const [category,setCategory] = useState("all")
  const [booksFilter,setBooksFIlter] = useState([])
  const [allBooks, setAllBooks] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [search,setSearch] = useState("")
  const {searchKey,setSearchKey} = useContext(ShareContext)
  console.log(categoryList);
  let timeout

  const [token, setToken] = useState('')
  console.log(allBooks);


  const getBooks = async () => {
    try {
      const result = await getAllBooksAPI(searchKey)
      if (result.status == 200) {
        setAllBooks(result?.data)
        setBooksFIlter(result?.data)
        const bookCategory = result.data.map(item => item.category)
        setCategoryList([...new Set(bookCategory)])
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const searchBook = (e) => {
    console.log(e.target.value);
    clearTimeout(timeout)
    console.log(category);
    
    timeout = setTimeout(()=>{
      setBooksFIlter(allBooks.filter(item=> {
        if(item.bookTitle.toLowerCase().includes(e.target.value.toLowerCase()) && (item.category == category || category == "all")){
          return item
        }
      } ))
    },500)
  }

  const handleFilter = (category) => {
    console.log(category);
    setCategory(category)
    if(category == "all"){
      setBooksFIlter(allBooks)
    }else{
      setBooksFIlter(allBooks.filter(item=> item.category == category))
    }
  }

  

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      getBooks()
    }

  }, [searchKey])

  return (
    <>
      <Header />
      {
        token ?
          <>
            <div className="flex flex-col justify-center items-center my-3">
              <h1 className='text-3xl font-bold my-5' >ALL BOOKS</h1>
              <div className="flex my-5">
                <input value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} type="text" placeholder='Search Books By Title...!' className='p-2 border border-gray-200 w-100' />
                <button className='p-2 bg-blue-800 text-white'>Search</button>
              </div>
            </div>

            <div className="grid grid-cols-4 p-5 px-40 my-10">
              <div className="col-span-1">
                <h1>Filter</h1>
                <div className="flex gap-5">
                  <input onChange={()=>handleFilter("all")} type="radio" name="filter" value="All" />
                  <label htmlFor="All">All</label>
                </div>                
                {
                  categoryList.map((item, index) => (
                    <div key={"ert"+index} className="flex gap-5">
                      <input onChange={()=>handleFilter(item)} type="radio" name="filter" value={item} id={item} />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))
                }
              </div>
              <div className="col-span-3">
                <div className="grid grid-cols-4 w-full">
                  {
                    allBooks.length == 0 ?
                      <div className="text-center my-5 font-bold">Loading....</div>
                      :
                      <>
                        {
                          booksFilter.map((item, index) => (
                            <div key={"sdfsdfa" + index} className="shadow-lg rounded p-3 m-4">
                              <img src={item.imageURL} className='w-full h-[350px]' alt="" />
                              <div className='flex flex-col items-center mt-4'>
                                <h2 className="font-bold text-blue-500">{item.author}</h2>
                                <h2 className='font-bold'>{item.bookTitle}</h2>
                                <p className='text-red-500'>Rs{item.discountPrice}</p>
                                <Link to={`/view/${item._id}/book`} className="p-3 bg-blue-800 text-white mt-2" >View Book</Link>
                              </div>
                            </div>
                          ))
                        }
                      </>

                  }

                </div>
              </div>
            </div>
          </>
          :
          <div className="w-full h-screen flex justify-center items-center flex-col gap-10">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3ltNDZ4NGhnbWk3Yng3OHJ4amtzcWlteDByY21iZjhibTM5ZmU3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XuslzM4IM98VCx8ko4/giphy.gif" alt="" />
            <p>PLease <Link to={"/login"} className='text-blue-600 underline' >Login</Link> to explore more</p>
          </div>
      }
    </>
  )
}

export default Books