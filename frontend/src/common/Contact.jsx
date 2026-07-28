import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone, FaPaperPlane } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Footer from './Footer';
import Header from '../User/Components/Header';

function Contact() {
    return (
        <>
            <Header />
            <section className='w-full flex justify-center py-10'>
                <div className="container flex flex-col gap-5 items-center">
                    <h1 className="text-3xl font-bold text-center">Contact</h1>
                    <p className="w-full text-justify">
                        Have questions, feedback, or need help finding the perfect book? We’d love to hear from you! Why Contact Us? Order-related support Book availability inquiries
                        Return/replacement queries Bulk/Institutional purchase requests Author or partnership inquiries. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic veniam id
                        eveniet recusandae pariatur, facilis fuga? Iusto, asperiores modi cum praesentium et, libero nisi eaque harum sed deleniti odio eveniet. Maiores delectus iusto voluptatibus
                        officia eveniet sunt quibusdam mollitia, error fugit laborum dolorum deserunt! Quaerat magni ad, veritatis dolor iusto, aliquam nisi consequatur officiis perferendis unde,
                        maiores quos praesentium voluptatibus. Magni dolores impedit, officia doloribus repellat fuga quos ad natus recusandae sed numquam fugiat, sapiente minima, nam vero
                        incidunt libero earum. Minima praesentium laborum tenetur corporis quod dolorum maxime pariatur.
                    </p>
                    <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-5 w-[80%]">
                        <div className="flex items-center gap-5">
                            <div className="p-5 rounded-full bg-zinc-400">
                                <FaLocationDot />
                            </div>
                            <p className='text-xl'>123 Main Street, Apt 4B, Anytown, CA 91234</p>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="p-5 rounded-full bg-zinc-400">
                                <FaPhone />
                            </div>
                            <p className='text-xl'>+098765432123</p>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="p-5 rounded-full bg-zinc-400">
                                <IoMdMail />
                            </div>
                            <p className='text-xl'>contact@bookstore.com</p>
                        </div>
                    </div>
                    <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col items-center bg-zinc-200 p-10 gap-5">
                            <h1 className='text-3xl font-bold pb-5'>Send Us A Message!</h1>
                            <input type="text" placeholder='Name' className='bg-slate-50 w-full p-3' />
                            <input type="text" placeholder='E Mail' className='bg-slate-50 w-full p-3' />
                            <input type="text" placeholder='Message' className='bg-slate-50 w-full p-3' />
                            <button className='bg-black w-full flex p-3 text-white justify-center items-center gap-3 font-bold'>
                                <span className='text-xl'>Submit</span>
                                <FaPaperPlane />
                            </button>
                        </div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.9751535682262!2d76.34006231158298!3d10.018908872665701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080ffce877d5ef%3A0x8bef6870ad11b98!2sLuminar%20Technolab%20-%20Software%20training%20institute%20in%20Kochi!5e0!3m2!1sen!2sin!4v1783331739929!5m2!1sen!2sin" width="600" height="450" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                    </div>


                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact