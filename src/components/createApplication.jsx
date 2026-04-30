import React, { useEffect } from 'react'
import ApplicationCard from './applicationCard'
import { useUser } from '@clerk/react'
import Usefetch from '@/hooks/useFetch'
import { getaplicationForJob, getMyApplications } from '@/api/apiapplications'


const CreateApplication = ({ userType }) => {
  const { user } = useUser()
  let userId = user?.id
  const { fn: myapplication, data: myApplicationsData, loading } = Usefetch(getMyApplications, { userId })
  
  useEffect(() => {
    if (userId && userType) {
      myapplication()
    }
  }, [userId])
  
  
  // ✅ Loading state - pehle check karo
  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading Applications...</p>
      </div>
    )
  }
  
  // ✅ No data state - map se pehle check karo
  if (!myApplicationsData || myApplicationsData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No applications found</p>
      </div>
    )
  }
  
  // ✅ Ab map safely use kar sakte ho
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myApplicationsData.map((item) => (
        <ApplicationCard 
          key={item.id} 
          data={item} 
          isCandidate={userType}
        />
      ))}
  </div>
);
}

export default CreateApplication