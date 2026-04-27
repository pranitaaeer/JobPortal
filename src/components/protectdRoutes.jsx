import { useUser } from '@clerk/react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectdRoutes = ({children}) => {
    const {isLoaded,isSignedIn,user}=useUser()
    const {pathname}=useLocation()
 

    console.log("signin",isSignedIn);
    if(isLoaded && !isSignedIn && isSignedIn!==undefined) {
       return <Navigate to={"/?sign-in=true"}/>
    }
    if(user !==undefined && !user.unsafeMetadata.role && pathname!== "/onboarding")
        return <Navigate  to={"/onboarding"}/>
    return children

    
  
}

export default ProtectdRoutes