import React from 'react'
import ApplicationCard from './applicationCard'

const CreateApplication = ({ userType }) => {
  // Sample data - replace with actual data from your backend
  const applications = [
    { id: 1, title: "Senior Frontend Developer", company: "Tech Corp", status: "Applied", date: "2024-01-15" },
    { id: 2, title: "Full Stack Engineer", company: "Startup Inc", status: "Interviewing", date: "2024-01-10" },
    { id: 3, title: "UI/UX Designer", company: "Design Studio", status: "Hired", date: "2024-01-05" },
    { id: 4, title: "Product Manager", company: "Product Co", status: "Rejected", date: "2024-01-01" },
  ]

  const postedJobs = [
    { id: 1, title: "React Developer", applicants: 25, status: "Active", date: "2024-01-20" },
    { id: 2, title: "Backend Engineer", applicants: 15, status: "Active", date: "2024-01-18" },
    { id: 3, title: "DevOps Engineer", applicants: 8, status: "Closed", date: "2024-01-10" },
  ]

  const data = userType ? applications : postedJobs

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <ApplicationCard 
          key={item.id} 
          data={item} 
          isCandidate={userType}
        />
      ))}
    </div>
  )
}

export default CreateApplication