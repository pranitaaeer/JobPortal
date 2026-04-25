import React from 'react'
import JobCard from './jobCard'

const CreateJob = ({ userType }) => {
  // Sample data - make sure each job has all required fields
  const postedJobs = [
    { 
      id: 1, 
      title: "Senior Frontend Developer", 
      company: "Tech Corp", 
      logo: "/companies/google.svg",
      location: "New York, NY (Remote)",
      type: "Full-time",
      salary: "$120k - $150k",
      postedDate: "2024-01-20",
      applicants: 25,
      status: "Active"
    },
    { 
      id: 2, 
      title: "Backend Engineer", 
      company: "Startup Inc", 
      logo: "/companies/microsoft.svg",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130k - $160k",
      postedDate: "2024-01-18",
      applicants: 15,
      status: "Active"
    },
    { 
      id: 3, 
      title: "UI/UX Designer", 
      company: "Design Studio", 
      logo: "/companies/amazon.svg",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $100k",
      postedDate: "2024-01-15",
      applicants: 32,
      status: "Active"
    },
  ]

  // Check if userType is employer (false means employer)
  if (userType !== false) {
    return null // or return something else for job seekers
  }

  // Check if postedJobs exists and has items
  if (!postedJobs || postedJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No jobs posted yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {postedJobs.map((job) => (
        <JobCard key={job.id} job={job} isMyJob={true} />
      ))}
    </div>
  )
}

export default CreateJob