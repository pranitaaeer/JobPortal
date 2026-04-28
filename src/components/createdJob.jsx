import React,{useEffect} from 'react'
import JobCard from './jobCard'
import { getMyJobs } from '@/api/apijobs'
import Usefetch from '@/hooks/useFetch'
import { useSession, useUser } from '@clerk/react'

const CreateJob = ({ iscandidate }) => {
  const {user}=useUser() 
 const {session,isLoaded}=useSession()

let userId=user?.id
  const {fn:myJobs,data:myJobsData,loading}=Usefetch(getMyJobs,userId)

 useEffect(() => {
   if(isLoaded && session ) myJobs()
 }, [isLoaded,session,user])
 
if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">{!isLoaded ? "Loading..." : "Fetching jobs..."}</div>
      </div>
    )
  }
 console.log("job data",myJobsData);
  

  if (iscandidate) {
    return null 
  }

  // Check if postedJobs exists and has items
  if (!myJobsData || myJobsData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No jobs posted yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myJobsData.map((job) => (
        <JobCard key={job.id} job={job} isMyJob={true} />
      ))}
    </div>
  )
}

export default CreateJob