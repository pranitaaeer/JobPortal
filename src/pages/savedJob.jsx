import JobCard from '@/components/jobCard'
import React, { useEffect } from 'react'
import { Bookmark, Briefcase } from 'lucide-react'
import { useSession, useUser } from '@clerk/react'
import { getSavedJobs } from '@/api/apisavedjobs'
import Usefetch from '@/hooks/useFetch'

const SavedJob = () => {
  // Sample saved jobs data

  const {user}=useUser()
  const {session,isLoaded}=useSession()
  let userId=user?.id
  const {fn:fetchSavedJobs,data:saveJobData,loading}=Usefetch(getSavedJobs,{userId})

  useEffect(() => {
    if(isLoaded && session && userId){
        fetchSavedJobs()
    }
  }, [session,isLoaded])
  
    console.log("user", user?.id);
  console.log("saved jobs data from API:", saveJobData);
  const savedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      logo: "/companies/google.svg",
      location: "New York, NY",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago",
      tags: ["React", "TypeScript", "Tailwind"],
      featured: true
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Startup Inc",
      logo: "/companies/microsoft.svg",
      location: "San Francisco, CA",
      salary: "$130k - $160k",
      type: "Full-time",
      posted: "3 days ago",
      tags: ["Node.js", "Python", "PostgreSQL"],
      featured: false
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Studio",
      logo: "/companies/amazon.svg",
      location: "Remote",
      salary: "$80k - $100k",
      type: "Contract",
      posted: "1 week ago",
      tags: ["Figma", "Adobe XD", "UI/UX"],
      featured: true
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Cloud Solutions",
      logo: "/companies/netflix.svg",
      location: "Austin, TX",
      salary: "$140k - $170k",
      type: "Full-time",
      posted: "5 days ago",
      tags: ["AWS", "Docker", "Kubernetes"],
      featured: false
    },
    {
      id: 5,
      title: "Product Manager",
      company: "Product Co",
      logo: "/companies/apple.svg",
      location: "Remote",
      salary: "$110k - $140k",
      type: "Full-time",
      posted: "1 day ago",
      tags: ["Agile", "Product Strategy", "Analytics"],
      featured: true
    },
    {
      id: 6,
      title: "Mobile Developer",
      company: "App Masters",
      logo: "/companies/meta.svg",
      location: "Los Angeles, CA",
      salary: "$100k - $130k",
      type: "Full-time",
      posted: "4 days ago",
      tags: ["React Native", "iOS", "Android"],
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <Bookmark className="w-8 h-8 text-gray-300" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Saved Jobs
          </h1>
          <p className="text-gray-400 text-lg">
            Jobs you've saved for later consideration
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Total Saved</p>
              <p className="text-2xl font-bold text-white">{savedJobs.length} Jobs</p>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">Ready to apply when you are</span>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        { saveJobData && saveJobData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {saveJobData.map((job) => (
              <JobCard key={job.id} job={job} isMyJob={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-4">
              <Bookmark className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No saved jobs yet</h3>
            <p className="text-gray-400">Start saving jobs you're interested in</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedJob