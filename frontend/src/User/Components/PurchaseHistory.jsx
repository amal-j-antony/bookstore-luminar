import React from 'react'

function PurchaseHistory() {
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
                
                <img className='h-20' src="https://cdn.textstudio.com/output/sample/normal/4/3/9/5/purchase-logo-860-15934.png" alt="" />
              </div>

            </div>
            <div className="w-full px-4 mt-4">
              <img src="https://m.media-amazon.com/images/I/71Z9zJnT4vL._SY466_.jpg" alt="" />
              
            </div>
          </div>
        </div>
        <div className="font-bold text-xl p-5">You havent uploaded any books yet</div>
      </div>
    </>
  )
}

export default PurchaseHistory