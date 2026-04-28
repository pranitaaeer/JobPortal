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
  const [salaryRange, setSalaryRange] = useState([0, 300]) // Changed to max 300k
  const [showFilters, setShowFilters] = useState(false)
  const [company_id, setCompany_id] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  
  const { fn: fetchJobs, data: jobsData, loading } = Usefetch(getJobs, {
    location,
    company_id,
    searchTerm
  })
  
  console.log("job data", jobsData);

  useEffect(() => {
    if (isLoaded && session) {
      fetchJobs()
    }
  }, [isLoaded, session])

  // Helper function to extract salary value from various formats
  const extractSalaryValue = (salaryValue, isMax = false) => {
    if (!salaryValue) return isMax ? Infinity : 0
    
    // If it's a number, return as is (assuming in thousands)
    if (typeof salaryValue === 'number') return salaryValue
    
    // If it's a string, try to extract numbers
    if (typeof salaryValue === 'string') {
      // Handle format like "$80k - $120k"
      const matches = salaryValue.match(/\d+/g)
      if (matches) {
        const numbers = matches.map(num => parseInt(num))
        return isMax ? Math.max(...numbers) : Math.min(...numbers)
      }
    }
    
    return isMax ? Infinity : 0
  }

  // Apply filters to the fetched data
  const getFilteredJobs = () => {
    if (!jobsData) return []
    
    return jobsData.filter(job => {
      // Filter by job type
      if (selectedJobType !== 'all' && job.job_type?.toLowerCase() !== selectedJobType.toLowerCase()) {
        return false
      }
      
      // Filter by experience level
      if (selectedExperience !== 'all') {
        const experience = job.experience_level || job.experience || ''
        if (selectedExperience === 'entry' && !experience.toLowerCase().includes('entry') && !experience.toLowerCase().includes('0-2')) {
          return false
        }
        if (selectedExperience === 'mid' && !experience.toLowerCase().includes('mid') && !experience.toLowerCase().includes('3-5')) {
          return false
        }
        if (selectedExperience === 'senior' && !experience.toLowerCase().includes('senior') && !experience.toLowerCase().includes('5+')) {
          return false
        }
      }
      
      // Filter by salary range
      // Get salary min and max from job (in thousands)
      let jobMinSalary = 0
      let jobMaxSalary = Infinity
      
      // Check different possible salary fields in your database
      if (job.salary_min && job.salary_max) {
        // If you have separate min and max fields (in thousands)
        jobMinSalary = typeof job.salary_min === 'number' ? job.salary_min : parseInt(job.salary_min) || 0
        jobMaxSalary = typeof job.salary_max === 'number' ? job.salary_max : parseInt(job.salary_max) || Infinity
      } else if (job.salary_range) {
        // If you have a salary_range string like "$80k - $120k"
        jobMinSalary = extractSalaryValue(job.salary_range, false)
        jobMaxSalary = extractSalaryValue(job.salary_range, true)
      } else if (job.salary) {
        // If you have a salary field
        jobMinSalary = extractSalaryValue(job.salary, false)
        jobMaxSalary = extractSalaryValue(job.salary, true)
      }
      
      // Check if job salary overlaps with selected salary range
      // Convert salaryRange from thousands to actual numbers
      const selectedMin = salaryRange[0] // Already in thousands
      const selectedMax = salaryRange[1] // Already in thousands
      
      // Job is included if:
      // Job's max salary >= selected min salary AND Job's min salary <= selected max salary
      const isSalaryInRange = jobMaxSalary >= selectedMin && jobMinSalary <= selectedMax
      
      if (!isSalaryInRange) {
        return false
      }
      
      return true
    })
  }
  
  const filteredJobs = getFilteredJobs()

  const handleSearch = () => {
    fetchJobs()
  }

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
            <Button 
              onClick={handleSearch}
              className="bg-white text-black hover:bg-gray-200 h-12 px-8 gap-2"
            >
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
                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectGroup>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="fulltime">Full Time</SelectItem>
                          <SelectItem value="parttime">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Experience Level</label>
                    <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectGroup>
                          <SelectItem value="all">All Levels</SelectItem>
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
                      defaultValue={[0, 300]}
                      min={0}
                      max={300}
                      step={10}
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$0k</span>
                      <span>$50k</span>
                      <span>$100k</span>
                      <span>$150k</span>
                      <span>$200k</span>
                      <span>$250k</span>
                      <span>$300k</span>
                    </div>
                  </div>
                </div>
                
                {/* Reset Filters Button */}
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={() => {
                      setSelectedJobType('all')
                      setSelectedExperience('all')
                      setSalaryRange([0, 300])
                      setSearchTerm('')
                      setLocation('')
                    }}
                    variant="outline"
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Showing <span className="text-blue-400">{filteredJobs.length}</span> jobs
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
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard 
                key={job.id}
                job={{
                  id: job.id,
                  title: job.title,
                  company: job.company_name || job.company || "Company",
                  location: job.location,
                  salary: job.salary_range || `$${job.salary_min || 80}k - $${job.salary_max || 120}k`,
                  type: job.job_type || "Full-time",
                  status: job.is_open !== false ? "Active" : "Closed",
                  posted: job.created_at ? new Date(job.created_at).toLocaleDateString() : "Recently",
                  tags: job.requirements ? (Array.isArray(job.requirements) ? job.requirements : job.requirements.split(',')) : ["New"],
                  featured: job.featured || false,
                  description: job.description,
                  company_id: job.comapny_id || job.company_id
                }}
                isMyJob={true}
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-400 py-12">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
              <p className="text-gray-400">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobListing