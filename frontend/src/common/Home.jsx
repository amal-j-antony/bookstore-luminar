import React, { useEffect, useState } from 'react'
import { IoIosSearch, IoMdHome } from "react-icons/io";
import Footer from './Footer';
import Preloader from './Preloader';
import Header from '../User/Components/Header';
import { Link } from 'react-router-dom'
import { getHomeBooksAPI } from '../services/allAPI.JS';

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [load, setLoad] = useState(true)

  const [homeBooks, setHomebooks] = useState([])
  console.log(homeBooks);
  

  


  const getBooks = async () => {
    try {
      const result = await getHomeBooksAPI()
      if (result.status == 200) {
        setHomebooks(result?.data)
        setLoad(false)
      }
    } catch (error) {
      console.log(error.message);
      setLoad(false)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])
  return (
    <>

      {isLoading ? <Preloader /> :
        <>
          <Header />
          <div className='h-[500px] w-full bg-[url("https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669473/samples/coffee.jpg")] bg-cover bg-center flex flex-col justify-center items-center text-white'>
            <div className='h-full w-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center gap-6'>
              <h1 className='text-6xl font-bold'>Wonderful Gifts</h1>
              <p>Gift your family and friends </p>
              <div className=' flex items-center'>
                <input type="text" className='bg-white p-2 rounded-3xl w-100' placeholder='Search For A Book' />
                <IoIosSearch className='text-gray-500 cursor-pointer text-2xl -ms-10' />
              </div>
            </div>
          </div>
          <section className='flex px-40 flex-col justify-center items-center my-5 p-5'>
            <h1>NEW ARRIVALS</h1>
            <h1>Explore our latest collection</h1>
            <div className="grid grid-cols-4 w-full my-10">
              {/* cards */}
              {
                homeBooks.length == 0 ?
                  <p>Loading...</p>
                  :
                  <>
                    {
                      homeBooks?.map((item, index) => (
                        <div className="shadow rounded p-3 m-4">
                          <img src={item.imageURL} className='w-full h-[500px]' alt="" />
                          <div className='flex flex-col items-center mt-4'>
                            <h2 className="font-bold text-blue-500">{item.author}</h2>
                            <h2 className='font-bold'>{item.bookTitle}</h2>
                            <p className='text-red-500'>$18.99</p>
                          </div>
                        </div>
                      ))
                    }
                  </>

              }

            </div>
            <div className="text-center my-10">
              <Link to={"/books"} className="bg-black p-3 text-white"> Explore More</Link>
            </div>
          </section>
          {/* featured authors */}

          <section className='grid grid-cols-2 p-10 text-lg'>
            <div className="flex flex-col gap-5">
              <ul className='text-center'>
                <li className='font-bold text-2xl'>Featured authors</li>
                <li className=' text-2xl'>Captivates with every word</li>
              </ul>

              <p>
                Welcome to the Author Spotlight section of our bookstore website! This
                feature is designed to celebrate writers, showcase their creative journeys,
                and help readers discover the minds behind their favorite books.
              </p>
              <p className=''>Our Author Features include:</p>
              <p>
                ✨ <b>Author Profiles :</b> Get to know each author through detailed profiles
                that highlight their biography, writing style, achievements, and personal
                inspirations.
              </p>
              <p>
                📖 <b>Published Works :</b> Explore a curated list of books written by the
                author with quick access to book details, reviews, and purchase options.
              </p>
              <p>
                🎤 <b>Interviews & Insights :</b> Exclusive interviews, behind-the-scenes
                stories, and writing tips that offer a deeper look into the author’s creative
                world.
              </p>

            </div>
            <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669477/main-sample.png" className='px-10' alt="" />
          </section>

          <section className='flex w-full justify-center py-10'>
            <div className="container flex flex-col items-center gap-5">
              <h1 className='text-center text-3xl font-bold'>TESTIMONIALS</h1>
              <h1 className='text-center text-2xl'>See What Others Are Saying</h1>
              <img src="https://res.cloudinary.com/dwaaoyztz/image/upload/v1782669460/samples/animals/cat.jpg" className='rounded-full h-50 w-50 object-cover' alt="" />
              <h2>Mister Meow Meow</h2>
              <p>This bookstore has completely changed the way I discover new books. The recommendations are always spot-on, and the delivery is super fast. I love the
                clean interface and the huge collection! The user experience is amazing! Easy navigation, great deals, and beautifully organized categories. I appreciate
                how quickly customer support responds too.</p>
            </div>
          </section>
          <Footer />
        </>}
    </>
  )
}

export default Home