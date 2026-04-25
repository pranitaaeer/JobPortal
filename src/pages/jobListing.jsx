import React, { useState } from 'react'
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

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [salaryRange, setSalaryRange] = useState([50, 200])
  const [showFilters, setShowFilters] = useState(false)

  // Sample jobs data
  const jobs = 5
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
              Showing <span className="text-blue-400">{jobs}</span> jobs
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
  <JobCard 
    job={{
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
    }}
    isMyJob={true}
  />
  
  <JobCard 
    job={{
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
    }}
    isMyJob={true}
  />
  
  <JobCard 
    job={{
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
    }}
    isMyJob={true}
  />
  
  <JobCard 
    job={{
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
    }}
    isMyJob={true}
  />
  
  <JobCard 
    job={{
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
    }}
    isMyJob={true}
  />
  
  <JobCard 
    job={{
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
    }}
    isMyJob={true}
  />
</div>
        </div>

        {/* Load More */}
        
      </div>
  )
}

export default JobListing