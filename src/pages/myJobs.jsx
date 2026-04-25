import CreateApplication from '@/components/createApplication'
import React, { useState } from 'react'
import { Briefcase, FileText, Plus } from 'lucide-react'
import CreatedJOb from '../components/createdJob'
import { Button } from '@/components/ui/button'

const MyJobs = () => {
  const [user, setUser] = useState(false) // true = job seeker, false = employer

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            {user ? (
              <FileText className="w-8 h-8 text-gray-300" />
            ) : (
              <Briefcase className="w-8 h-8 text-gray-300" />
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            {user ? "My Applications" : "My Jobs"}
          </h1>
          <p className="text-gray-400 text-lg">
            {user 
              ? "Track all your job applications in one place" 
              : "Manage your posted job listings"}
          </p>
        </div>

        {/* Applications Grid */}
        {user ? (
          <CreateApplication userType={user} />
        ) : (
          <CreatedJOb  userType={user}/>
        )}
      </div>
    </div>
  )
}

export default MyJobs