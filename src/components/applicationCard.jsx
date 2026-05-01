import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Boxes, 
  BriefcaseBusiness, 
  Download, 
  School, 
  Calendar,
  MapPin,
  Users,
  Eye,
  Trash2
} from 'lucide-react'
import Usefetch from '@/hooks/useFetch'
import { DeleteApplication } from '@/api/apiapplications'
import { useUser } from '@clerk/react'

const ApplicationCard = ({ data, isCandidate, length = 0 ,refershdata}) => {
  const [status, setStatus] = useState(data.status || "Applied")
  const { user } = useUser()

  // ✅ Sirf delete ke liye Usefetch (bin default params ke)
  const { fn: deletefn,data:deletedData, loading: isDeleting } = Usefetch(DeleteApplication,{userId:user?.id,applicationId:data?.id})

  const handleDelete = async () => {

    console.log("userId",user?.id);
    console.log("applicationId",data?.id);
    // ✅ Validation
    if (!user?.id) {
      alert("Please login to delete applications")
      return
    }
    
    if (!data?.id) {
      alert("Application ID not found")
      return
    }
    
    if (confirm("Are you sure you want to delete this application?")) {
     
      await deletefn()
      // ✅ Check result directly
        alert("Application deleted successfully!")     
        refershdata()
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-blue-600',
      'interviewing': 'bg-purple-600',
      'Hired': 'bg-green-600',
      'Rejected': 'bg-red-600',
      'Active': 'bg-green-600',
      'Closed': 'bg-gray-600'
    }
    return colors[status] || 'bg-gray-600'
  }

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-white font-semibold">
            {isCandidate ? data.jobs?.company?.name : data.jobs?.company?.name}
          </CardTitle>
          {isCandidate && (
            <Trash2
              size={18}
              className={`bg-gray-800 text-gray-300 rounded-full h-8 w-8 p-1.5 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={!isDeleting ? handleDelete : undefined}
            />
          )}
        </div>
        {!isCandidate && (
          <p className="text-gray-400 text-sm mt-1">
            {data.jobs?.title}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <BriefcaseBusiness size={15} className="text-gray-500" />
          <span>
            {isCandidate ? `Experience: ${data.experiance} years` : `Applicants: ${length}`}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <School size={15} className="text-gray-500" />
          <span>
            {isCandidate ? data.education : data.jobs?.job_type}
          </span>
        </div>

        <div className="flex items-start gap-2 text-gray-400 text-sm">
          <Boxes size={15} className="text-gray-500 mt-0.5" />
          <div className="flex flex-wrap gap-1">
            {isCandidate ? (
              <>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">React</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">Node.js</Badge>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">TypeScript</Badge>
              </>
            ) : (
              <span>React, Node.js, PostgreSQL, Docker</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm pt-2">
          <Calendar size={14} />
          <span>Posted: {data.created_at}</span>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 pt-2 bg-gray-800">
        <div className="w-full flex justify-between items-center">
          <span className="text-gray-400 text-sm">Status:</span>
          <Badge className={`${getStatusColor(status)} text-white px-3 py-1`}>
            {status}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ApplicationCard