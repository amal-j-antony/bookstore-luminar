import React, { useEffect, useState } from 'react'
import { getPurchaseHistory } from '../../services/allAPI.JS'

function PurchaseHistory() {
  const [history, setHistory] = useState([])
  const userPurchaseHistory = async () => {
    try {
      const result = await getPurchaseHistory()
      setHistory(result.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userPurchaseHistory()
  }, [])
  return (
    <>
      <div className="p-10 shadow-rounded">
        <div className="p-5 rounded mt-4 bg-gray-100">
          <div className="grid items-center grid-cols-[3fr_1fr]">
            {
              history.length > 0 ?
                <>
                  {
                    history.map((item, index) => (
                      <React.Fragment key={"hjhkj" + index}>
                        <div className="px-4">
                          <h1>{item.bookTitle}</h1>
                          <h2>{item.originalPrice}</h2>
                          <h3>{item.discountPrice}</h3>

                          <p><span className='font-semibold' >Abstract: </span>{item.abstract}</p>
                          <div className="flex mt-5">

                            <img className='h-20' src="https://cdn.textstudio.com/output/sample/normal/4/3/9/5/purchase-logo-860-15934.png" alt="" />
                          </div>

                        </div>
                        <div className="w-full px-4 mt-4">
                          <img src={item.imageURL} alt="" />

                        </div>
                      </React.Fragment>
                    ))
                  }
                </>
                :
                <div className="font-bold text-xl p-5">You havent uploaded any books yet</div>
            }
          </div>
        </div>

      </div>
    </>
  )
}

export default PurchaseHistory