import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'
import Footer from '../../common/Footer'


function PaymentError() {
    return (
        <>
            <Header />
            <div className="container min-h-screen flex justify-center items-center">
                <div className="md:grid grid-cols-2 px-20 justify-center items-ceter my-10">
                    <div className="">
                        <h1 className="text-blue-500 md:text-4xl font-bold">Sorry, Payment Declined </h1>
                        <p className="text-2xl my-10">We apologise for the inconvenience caused and appreciate your visit to Bookstore</p>
                        <Link to={'/books'} className='flex items-center justify-center bg-blue-700 w-60 p-2 text-white font-bold' ><FaBackward className='me-2' />
                            Explore more Books...</Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <div class="tenor-gif-embed" data-postid="24077625" data-share-method="host" data-aspect-ratio="0.9875" data-width="100%"><a href="https://tenor.com/view/brexby-gif-24077625">Brexby GIF</a>from <a href="https://tenor.com/search/brexby-gifs">Brexby GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentError