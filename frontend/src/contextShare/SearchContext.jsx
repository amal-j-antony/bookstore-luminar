import React, { createContext, useState } from 'react'

export const ShareContext = createContext()

function SearchContext({children}) {
    const [searchKey,setSearchKey] = useState("")

  return (
    <ShareContext.Provider value={{searchKey,setSearchKey}}>
        {children}
    </ShareContext.Provider>
  )
}

export default SearchContext