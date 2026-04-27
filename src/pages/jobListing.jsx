import React, { useEffect, useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Filter,
  X,
  Star,
  Building2
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import JobCard from '@/components/jobCard'
import { getJobs } from '@/api/apijobs'
import { useSession } from '@clerk/react'
import Usefetch from '@/hooks/useFetch'

const JobListing = () => {
  const { session, isLoaded } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [salaryRange, setSalaryRange] = useState([50, 200])
  const [showFilters, setShowFilters] = useState(false)
  
  // ✅ HOOK KO TOP LEVEL PE CALL KARO (function ke andar nahi)
  const { fn: fetchJobs, data: jobsData, loading } = Usefetch(getJobs, {})
  console.log("job data",jobsData);
  // ✅ Jab component mount ho aur session ready ho, tab fetch karo
  useEffect(() => {
    if (isLoaded && session) {
      fetchJobs()
    }
  }, [isLoaded, session])

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">{!isLoaded ? "Loading..." : "Fetching jobs..."}</div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Find Your <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Dream Job</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover thousands of opportunities from top companies
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600 h-12"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or remote"
                className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600 h-12"
              />
            </div>
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 h-12 gap-2"
            >
              <Filter size={18} />
              Filters
              {showFilters && <X size={16} />}
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200 h-12 px-8 gap-2">
              <Search size={18} />
              Search Jobs
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mt-4 bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Job Type</label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectGroup>
                          <SelectItem value="fulltime">Full Time</SelectItem>
                          <SelectItem value="parttime">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Experience Level</label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectGroup>
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                          <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">
                      Salary Range: ${salaryRange[0]}k - ${salaryRange[1]}k
                    </label>
                    <Slider
                      defaultValue={[50, 200]}
                      max={300}
                      step={10}
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Showing <span className="text-blue-400">{jobsData?.length || 0}</span> jobs
            </h2>
            <p className="text-gray-500 text-sm">Find your perfect match</p>
          </div>
          <Select>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-800 text-white">
              <SelectValue placeholder="Sort by: Recent" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectGroup>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary-high">Highest Salary</SelectItem>
                <SelectItem value="salary-low">Lowest Salary</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobsData && jobsData.length > 0 ? (
            jobsData.map((job) => (
              <JobCard 
                key={job.id}
                job={{
                  title: job.title,
                  company: job.company || job.comapny_id || "Company",
                  location: job.location,
                  salary: job.salary || "$80k - $120k",
                  type: job.job_type || "Full-time",
                  status: job.isOpen ? "Active" : "Closed",
                  posted: job.created_at ? new Date(job.created_at).toLocaleDateString() : "Recently",
                  tags: job.requirements ? (Array.isArray(job.requirements) ? job.requirements : job.requirements.split(',')) : ["New"],
                  featured: false
                }}
                isMyJob={true}
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-400 py-12">
              No jobs found. Check back later!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobListing