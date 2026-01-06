import React, { useState } from 'react'
import { createContext } from 'react'

export const AppContext = createContext()



const LoginProvider = ({children}) => {
    const [userData, setUserData] = useState({
        id : null,
        fullname :null,
        email : null,
        loginStatus : null
    })
  return (
    <AppContext.Provider  value={{userData,setUserData}}>
        {children}
    </AppContext.Provider>
    
  )
}

export default LoginProvider