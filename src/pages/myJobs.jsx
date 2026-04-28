import CreateApplication from '@/components/createApplication'
import React, { useEffect, useState } from 'react'
import { Briefcase, FileText, Plus } from 'lucide-react'
import CreatedJOb from '../components/createdJob'
import { useSession, useUser } from '@clerk/react'
import Usefetch from '@/hooks/useFetch'
import { getMyJobs } from '@/api/apijobs'

const MyJobs = () => {

 const {user}=useUser() 
 const {session,isLoaded}=useSession()
 
 const [iscandidate,setisCandidate]=useState(null)


 useEffect(() => {
    if(isLoaded && session && user ){
     user.unsafeMetadata.role==="candidate" ?  setisCandidate(true): setisCandidate(false)
   }
 }, [isLoaded,session,user])
 
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            {iscandidate ? (
              <FileText className="w-8 h-8 text-gray-300" />
            ) : (
              <Briefcase className="w-8 h-8 text-gray-300" />
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            {iscandidate ? "My Applications" : "My Jobs"}
          </h1>
          <p className="text-gray-400 text-lg">
            {iscandidate 
              ? "Track all your job applications in one place" 
              : "Manage your posted job listings"}
          </p>
        </div>

        {/* Applications Grid */}
        {iscandidate ? (
          <CreateApplication userType={iscandidate} />
        ) : (
          <CreatedJOb  userType={iscandidate}/>
        )}
      </div>
    </div>
  )
}

export default MyJobs