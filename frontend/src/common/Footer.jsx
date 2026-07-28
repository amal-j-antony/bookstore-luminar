import React from 'react'
import { FaArrowRight,FaFacebookF } from "react-icons/fa";
import { FaInstagram,FaXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

function Footer() {
  return (
    <>
        <section className='w-full flex justify-center items-center bg-black text-white  py-10'>
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl font-bold text-justify">ABOUT US</h1>
                    <p>We believe books are ore than just pages - they are windows into new worlds ,teachers of wisdom, and companions for life. Our journey began with a passion for storytelling and a mission to make reading accessible, enjoyable and inspiring for everyone</p>
                </div>
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl font-bold">NEWSLETTER</h1>
                    <p>Stay updated with our latest trends</p>
                    <div className="flex">
                        <input type="text" className='bg-white placeholder:text-gray-600 px-5' placeholder='Enter email' />
                        <div className='bg-yellow-500 p-3'><FaArrowRight className='text-2xl' /></div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl font-bold">FOLLOW US</h1>
                    <p>Let us be social</p>
                    <div className="flex gap-5">
                        <FaFacebookF />
                        <FaInstagram />
                        <FaXTwitter />
                        <IoMdMail />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Footer