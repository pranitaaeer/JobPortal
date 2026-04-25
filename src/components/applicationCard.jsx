import React, { useState } from 'react'
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
  Eye
} from 'lucide-react'

const ApplicationCard = ({ data, isCandidate }) => {
  const [status, setStatus] = useState(data.status || "Applied")

  const handleDownload = () => {
    console.log("Resume downloaded for:", data.title)
    // Add actual download logic here
  }

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-blue-600',
      'Interviewing': 'bg-purple-600',
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
            {isCandidate ? data.title : data.company || data.title}
          </CardTitle>
          {isCandidate && (
            <Download
              size={18}
              className="bg-gray-800 text-gray-300 rounded-full h-8 w-8 p-1.5 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors"
              onClick={handleDownload}
            />
          )}
        </div>
        {!isCandidate && (
          <p className="text-gray-400 text-sm mt-1">
            {data.title}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Experience/Company Info */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <BriefcaseBusiness size={15} className="text-gray-500" />
          <span>
            {isCandidate ? "Experience: 3-5 years" : `Applicants: ${data.applicants || 0}`}
          </span>
        </div>

        {/* Education/Location */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <School size={15} className="text-gray-500" />
          <span>
            {isCandidate ? "Bachelor's in Computer Science" : "Remote • Full-time"}
          </span>
        </div>

        {/* Skills */}
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

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-500 text-sm pt-2">
          <Calendar size={14} />
          <span>Posted: {data.date}</span>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 pt-2 bg-gray-800">
        {/* Status Badge or Selector */}
        {isCandidate ? (
          <div className="w-full flex justify-between items-center ">
            <span className="text-gray-400 text-sm">Status:</span>
            <Badge className={`${getStatusColor(status)} text-white px-3 py-1`}>
              {status}
            </Badge>
          </div>
        ) : (
          <div className="w-full space-y-2">
            <Select defaultValue="status" onValueChange={setStatus}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Application Status"  />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectGroup>
                  <SelectItem value="Applied" className="hover:bg-gray-700">Applied</SelectItem>
                  <SelectItem value="Interviewing" className="hover:bg-gray-700">Interviewing</SelectItem>
                  <SelectItem value="Hired" className="hover:bg-gray-700">Hired</SelectItem>
                  <SelectItem value="Rejected" className="hover:bg-gray-700">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {/* View Applications Button for Employers */}
            <Button 
              variant="outline" 
              className="w-full bg-gray-800 text-white border-gray-700 hover:bg-gray-700 gap-2"
            >
              <Users size={14} />
              View Applications
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default ApplicationCard