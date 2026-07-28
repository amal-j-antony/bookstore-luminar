import React from 'react'

function BookStatus() {
  return (
    <>
      <div className="p-10 my-15 shadow-rounded">
        <div className="p-5 rounded mt-4 bg-gray-100">
          <div className="grid items-center grid-cols-[3fr_1fr]">
            <div className="px-4">
              <h1>Book Title</h1>
              <h2>Book Price</h2>
              <h3>Disocunt Price</h3>

              <p><span className='font-semibold' >Abstract: </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo deserunt molestiae excepturi aliquid error facilis, quia aspernatur, doloribus a nesciunt quasi voluptate corrupti, ab impedit optio officia! Eveniet, corrupti neque!</p>
              <div className="flex mt-5">
                <img className='h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ic-g5bD0fLLP2yj6XZ4hCpg95xMEvmctVmDkhCrlR42flgUhwcbzueA&s=10" alt="" />
                <img className='h-20' src="https://static.vecteezy.com/system/resources/thumbnails/007/957/428/small/grunge-pending-word-rubber-stamp-pending-red-sign-sticker-set-grunge-vintage-square-label-illustration-isolated-on-white-background-vector.jpg" alt="" />
                <img className='h-20' src="https://static.vecteezy.com/system/resources/thumbnails/007/249/018/small_2x/sold-stamp-sign-with-grunge-effect-on-white-background-free-vector.jpg" alt="" />
              </div>
              
            </div>
            <div className="w-full px-4 mt-4">
                <img src="https://m.media-amazon.com/images/I/71Z9zJnT4vL._SY466_.jpg" alt="" />
                <button className="bg-red-600 text-white p-2 rounded float-end mt-5">Delete</button>
              </div>
          </div>
        </div>
        <div className="font-bold text-xl p-5">You havent uploaded any books yet</div>
      </div>
    </>
  )
}

export default BookStatus