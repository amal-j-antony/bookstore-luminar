import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'

function PaymentSuccess() {
  return (
    <>
    <Header/>
    <div className="container min-h-screen flex justify-center items-center">
        <div className="md:grid grid-cols-2 px-20 justify-center items-ceter my-10">
            <div className="">
                <h1 className="text-blue-100 md:text-4xl font-bold">Congratulations!!!</h1>
                <p className="text-2xl my-10">Thank you for purchasing with bookstore, Hope you have a good time with us...</p>
                <Link to={'/books'} className='flex items-center justify-center bg-blue-700 w-60 p-2 text-white font-bold' ><FaBackward className='me-2' />
                Explore more Books...</Link>
            </div>
            <div className="flex justify-center items-center">
                <div class="tenor-gif-embed" data-postid="2393648018896340499" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/vvs-peng-card-pudgy-penguin-pudgy-penguins-credit-card-gif-2393648018896340499">Vvs Peng Card GIF</a>from <a href="https://tenor.com/search/vvs+peng-gifs">Vvs Peng GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
            </div>
        </div>
    </div>
        
    </>
  )
}

export default PaymentSuccess