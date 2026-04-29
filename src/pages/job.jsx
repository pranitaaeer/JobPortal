import { Briefcase, DoorClosed, DoorOpen, MapPinIcon, Building2, Calendar, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import ApplyJobDrawer from "../components/applyJob"
import ApplicationCard from '@/components/applicationCard';
import { useSession, useUser } from '@clerk/react';
import Usefetch from '@/hooks/useFetch';
import { getSingleJob } from '@/api/apijobs';
import { useParams, useNavigate } from 'react-router-dom';
import CreateApplication from '@/components/createApplication';

// Helper function to calculate days ago
const calculateDaysAgo = (dateString) => {
  if (!dateString) return 'Recently'
  
  const postedDate = new Date(dateString)
  const today = new Date()
  const diffTime = Math.abs(today - postedDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays} days ago`
}

const Job = () => {
  const { isLoaded, session } = useSession()
  const { user } = useUser()
  const [isCandidate, setIsCandidate] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const { fn: singlefn, data: singleJobData, loading } = Usefetch(getSingleJob, id)
 
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    if (user?.unsafeMetadata?.role === "candidate") {
      setIsCandidate(true)
    } else if (user?.unsafeMetadata?.role === "recruiter") {
      setIsCandidate(false)
    }
  }, [user])

  useEffect(() => {
    if (isLoaded && session && id && !hasFetched && !loading && !singleJobData) {
      singlefn()
      setHasFetched(true)
    } else if (isLoaded && !id) {
      navigate('/jobs')
    }
  }, [isLoaded, session, id, navigate, singlefn, loading, singleJobData, hasFetched])

  // Show loading state
  if (loading && !singleJobData) {
    return (
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center text-white">Loading job details...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  // Show error or not found state
  if (!singleJobData || !singleJobData.data) {
    return (
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center text-white">Job not found or failed to load</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  const job = singleJobData.data
  
  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Card */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardContent className="p-6 sm:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-800">
              <div className="flex gap-4">
                <img 
                  src={job.company.logo_url}
                  alt="Company Logo" 
                  className="w-16 h-16 object-contain bg-gray-800 rounded-lg p-2"
                />
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {job.title}
                  </h1>
                  <p className="text-gray-400 text-lg">
                    {job.company?.title || 'Company'} • Posted {calculateDaysAgo(job.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Rest of your component remains the same */}
            {/* Job Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
                <MapPinIcon size={18} className="text-gray-400" />
                <div>
                  <p className="text-gray-500 text-xs">{job.location}</p>
                  <p className="text-white text-sm font-medium">{job.job_type}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
                <Briefcase size={18} className="text-gray-400" />
                <div>
                  <p className="text-gray-500 text-xs">Applicants</p>
                  <p className="text-white text-sm font-medium">24 applicants</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
                {job.isOpen ? (
                  <>
                    <DoorOpen size={18} className="text-green-400" />
                    <div>
                      <p className="text-gray-500 text-xs">Status</p>
                      <p className="text-green-400 text-sm font-medium">Open</p>
                    </div>
                  </>
                ) : (
                  <>
                    <DoorClosed size={18} className="text-red-400" />
                    <div>
                      <p className="text-gray-500 text-xs">Status</p>
                      <p className="text-red-400 text-sm font-medium">Closed</p>
                    </div>
                  </>
                )}
              </div>

              {!isCandidate && (
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <Select>
                    <SelectTrigger className="w-full bg-transparent border-gray-700 text-white">
                      <SelectValue placeholder="Hiring status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectGroup>
                        <SelectLabel className="text-gray-400">Hiring Status</SelectLabel>
                        <SelectItem value="open" className="hover:bg-gray-700">Open</SelectItem>
                        <SelectItem value="closed" className="hover:bg-gray-700">Closed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Job Description Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">About the job</h2>
                <p className="text-gray-300 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">What we are looking for</h2>
                <div className="text-gray-300 leading-relaxed space-y-2">
                  {job.requirements}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <ApplyJobDrawer />
            </div>
          </CardContent>
        </Card>

        {/* Applications Section - Only show for employers or if user has permission */}
        {!isCandidate && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Applications</h2>
                <p className="text-gray-400 text-sm mt-1">View all candidates who applied for this position</p>
              </div>
              <Badge className="bg-gray-800 text-white">4 total</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ApplicationCard 
                data={{ title: "Software Engineer", company: "Amazon", status: "Interviewing" }} 
                isCandidate={true} 
              />
              <ApplicationCard 
                data={{ title: "Software Engineer", company: "Amazon", status: "Applied" }} 
                isCandidate={true} 
              />
              <ApplicationCard 
                data={{ title: "Software Engineer", company: "Amazon", status: "Hired" }} 
                isCandidate={true} 
              />
              <ApplicationCard 
                data={{ title: "Software Engineer", company: "Amazon", status: "Rejected" }} 
                isCandidate={true} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Job