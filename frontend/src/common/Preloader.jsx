import React from 'react'
import {GridLoader} from 'react-spinners'
function Preloader() {
  return (
    <>
        <div className="flex flex-col justify-center items-center w-full h-screen">
            Loading...
            <GridLoader />
        </div>
    
    </>
  )
}

export default Preloader