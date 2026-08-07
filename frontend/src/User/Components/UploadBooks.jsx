import React, { useEffect } from 'react'
import { useState } from 'react';
import { BsCloudUploadFill } from "react-icons/bs";
import { MdCloudUpload } from "react-icons/md";
import { toast } from 'react-toastify';
import { addBookAPI } from '../../services/allAPI.JS';
import useDebounce from '../../hooks/useDebounce,js';
import { generateAbstractAPI } from '../../services/allAPI.JS';

function UploadBooks() {
    
    const [bookDetails, setBookDetails] = useState({
        bookTitle: "", publisher: "", author: "", isbn: "", imageURL: "", language: "", totalPages: "", category: "", price: "", discountPrice: "", abstract: "", uploadImages: []
    })
    const debounceTitleSearch = useDebounce(bookDetails?.bookTitle,2000)
    const [preview, setPreview] = useState("")
    const [previewList, setPreviewList] = useState([])
    console.log(bookDetails);

    const handleInput = (e, value) => {
        console.log(value);

        if (value == "uploadImages") {
            if (previewList.length < 3) {
                console.log(value);
                const imageFile = e.target.files[0]
                setBookDetails({
                    ...bookDetails,
                    [value]: [...bookDetails.uploadImages, imageFile]
                })
                const url = URL.createObjectURL(imageFile)
                setPreview(url)
                setPreviewList([...previewList, url])
            } else {
                toast.info("error")
            }

        } else {
            setBookDetails({
                ...bookDetails,
                [value]: e.target.value
            })
        }
    }

    const handleUpload = async () => {
        const { bookTitle, publisher, author, isbn, imageURL, language, totalPages, category, price, discountPrice, abstract, uploadImages } = bookDetails
        if (bookTitle &&
            publisher &&
            author &&
            isbn &&
            imageURL &&
            language &&
            totalPages &&
            category &&
            price &&
            discountPrice &&
            abstract &&
            uploadImages.length > 0
        ) {
            const reqBody = new FormData()
            for (let key in bookDetails) {
                if (key != "uploadImages") {
                    reqBody.append(key, bookDetails[key])
                } else {
                    bookDetails.uploadImages.forEach(image => {
                        reqBody.append("uploadImages", image)
                    })
                }
            }
            const result = await addBookAPI(reqBody)
            console.log(result);
            
            if (result.status == 200) {
                toast.success('Book added successfully')
                handleReset()
            }else{
                toast.error(result.message)
            }
        } else {
            toast.info("Please fill all Fields")
        }
    }

    const handleReset = () => {
        setBookDetails({
            bookTitle: "", publisher: "", author: "", isbn: "", imageURL: "", language: "", totalPages: "", category: "", price: "", discountPrice: "", abstract: "", uploadImages: []
        })
        setPreview("")
        setPreviewList([])
    }

    useEffect(()=>{
        if(debounceTitleSearch){
            console.log('Ready for api call')            
            generateAbstract()
        }
    },[debounceTitleSearch])

    const generateAbstract = async () => {
        const result = await generateAbstractAPI(debounceTitleSearch)
        console.log(result);
        
        if(result.status == 200){
            setBookDetails({...bookDetails,
                abstract:result.data.message
            })
        }
    }


    return (
        <>
            <div className="bg-gray-300 p-10">
                <h1 className='text-center text-3xl'>Upload book details</h1>
                <div className="grid grid-cols-2 gap-5 mt-10 w-full">
                    <div className="">
                        <input value={bookDetails.bookTitle} onChange={(e) => handleInput(e, "bookTitle")} type="text" placeholder='Book title' className='w-full bg-white p-2 my-5' />
                        <input value={bookDetails.author} onChange={(e) => handleInput(e, "author")} type="text" placeholder='Author' className='w-full bg-white p-2 mb-5' />
                        <input value={bookDetails.imageURL} onChange={(e) => handleInput(e, "imageURL")} type="text" placeholder='Book Cover' className='w-full bg-white p-2 mb-5' />
                        <input value={bookDetails.totalPages} onChange={(e) => handleInput(e, "totalPages")} type="text" placeholder='Total Pages' className='w-full bg-white p-2 mb-5' />
                        <input value={bookDetails.price} onChange={(e) => handleInput(e, "price")} type="text" placeholder='Original Price' className='w-full bg-white p-2 mb-5' />
                        <input value={bookDetails.discountPrice} onChange={(e) => handleInput(e, "discountPrice")} type="text" placeholder='Disocunt Price' className='w-full bg-white p-2 mb-5' />
                        <textarea value={bookDetails.abstract} onChange={(e) => handleInput(e, "abstract")} type="text" placeholder='Abstract' className='w-full max-h-50 h-full bg-white p-2 mb-5' />
                    </div>
                    <div className="">
                        <input value={bookDetails.publisher} onChange={(e) => handleInput(e, "publisher")} type="text" placeholder='Publisher' className='w-full bg-white p-2 my-5' />
                        <input value={bookDetails.isbn} onChange={(e) => handleInput(e, "isbn")} type="text" placeholder='ISBN' className='w-full bg-white p-2 mb-5' />
                        <input value={bookDetails.language} onChange={(e) => handleInput(e, "language")} type="text" placeholder='Language' className='w-full bg-white p-2 mb-5' />
                        <input value={bookDetails.category} onChange={(e) => handleInput(e, "category")} type="text" placeholder='Category' className='w-full bg-white p-2 mb-5' />
                        <label htmlFor="bookImages" className='w-full flex justify-center p-10'>
                            <input onChange={(e) => handleInput(e, "uploadImages")} type="file" hidden id='bookImages' />
                            {preview ? <img src={preview} className='h-60' alt="" /> : <MdCloudUpload className='text-[200px] cursor-pointer' />}
                        </label>
                        <div className="flex justify-center items-center">
                            {previewList.length>0 &&
                                <>
                                    {
                                        previewList.map((item) => (
                                            <img key={item} src={item} alt="" className='w-20 pe-5' />
                                        ))
                                    }

                                    {previewList.length < 3 &&
                                        <label htmlFor="bookImagesSmallInput" className='flex justify-center p-3'>
                                            <input onChange={(e) => handleInput(e, "uploadImages")} type="file" hidden id='bookImagesSmallInput' />
                                            <MdCloudUpload className='text-8xl cursor-pointer' />
                                        </label>}
                                </>}
                        </div>
                        <div className="flex justify-center gap-5">
                            <button onClick={handleReset} className='text-white bg-green-500 py-2 px-3'>Reset</button>
                            <button onClick={handleUpload} className='text-white bg-blue-500 py-2 px-3'>Add Book Details</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UploadBooks