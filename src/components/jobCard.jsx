import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  MapPinIcon, 
  Trash2Icon, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Users,
  Eye
} from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const JobCard = ({ job = {}, isMyJob = false }) => {
  const [saved, setIsSaved] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Early return if job is empty or undefined
  if (!job || Object.keys(job).length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="py-8 text-center">
          <p className="text-gray-400">No job data available</p>
        </CardContent>
      </Card>
    )
  }

  const handleDeleteJob = () => {
    console.log("Job deleted:", job.title)
    setShowDeleteConfirm(false)
    // Add actual delete logic here
  }

  const handleSaveJob = () => {
    setIsSaved(!saved)
    console.log(saved ? "Job unsaved" : "Job saved")
  }

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-600',
      'Closed': 'bg-gray-600',
      'Pending': 'bg-yellow-600'
    }
    return colors[status] || 'bg-gray-600'
  }

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && isMyJob && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-10 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-white mb-3">Delete "{job.title || 'this job'}"?</p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDeleteJob}
              >
                Yes, Delete
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-gray-800 text-white border-gray-700"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl text-white font-semibold hover:text-blue-400 transition-colors">
              <Link to={`/job/${job.id || '#'}`}>{job.title || 'Untitled Job'}</Link>
            </CardTitle>
            
            {/* Logo and Company Name in same line */}
            <div className="flex items-center gap-2 mt-2">
              {job.logo && (
                <img 
                  src={job.logo} 
                  alt={job.company || 'Company logo'} 
                  className="h-10 w-10 object-contain bg-gray-800 rounded-full text-center"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <p className="text-gray-400 text-sm">{job.company || 'Unknown Company'}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {isMyJob ? (
              <Trash2Icon
                size={18}
                className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors"
                onClick={() => setShowDeleteConfirm(true)}
              />
            ) : (
              <Heart
                size={20}
                className={`cursor-pointer transition-all hover:scale-110 ${
                  saved 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-500 hover:text-red-400'
                }`}
                onClick={handleSaveJob}
              />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Company Logo and Location */}
        <div className="flex items-center gap-3">
          
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <MapPinIcon size={14} />
            <span>{job.location || 'Location not specified'}</span>
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Briefcase size={14} className="text-gray-500" />
            <span>{job.type || 'Full-time'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <DollarSign size={14} className="text-gray-500" />
            <span>{job.salary || 'Salary not specified'}</span>
          </div>
        </div>

        {/* Posted Date */}
        <div className="flex items-center gap-2 text-gray-500 text-xs pt-1">
          <Calendar size={12} />
          <span>Posted: {job.postedDate || 'Recent'}</span>
        </div>

        {/* Applicants Count (for employer view) */}
        {isMyJob && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-800 mt-2">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Users size={14} />
              <span>{job.applicants || 0} applicants</span>
            </div>
            <Badge className={`${getStatusColor(job.isOpen? "Active" :"Closed")} text-white text-xs px-2 py-0.5`}>
              {job.isOpen ?'Active' :"close"}
            </Badge>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-3 pt-2">
        <Link to={`/job/1`} className="flex-1">
          <Button variant="secondary" className="w-full bg-gray-800 text-white hover:bg-gray-700 gap-2">
            <Eye size={16} />
            View Details
          </Button>
        </Link>
        
        {!isMyJob && (
          <Button
            variant="outline"
            className="px-4 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            onClick={handleSaveJob}
          >
            <Heart 
              size={18} 
              className={saved ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default JobCard