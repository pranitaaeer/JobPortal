import { Briefcase, DoorClosed, DoorOpen, MapPinIcon, Building2, Calendar, Users } from 'lucide-react';
import React, { useState } from 'react'
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
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ApplyJobDrawer from "../components/applyJob"
import ApplicationCard from '@/components/applicationCard';

const Job = () => {
  const [isOpen, setIsOpen] = useState(true);
  
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
                  src="../../public/amazon.svg" 
                  alt="Company Logo" 
                  className="w-16 h-16 object-contain bg-gray-800 rounded-lg p-2"
                />
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Senior Frontend Developer
                  </h1>
                  <p className="text-gray-400 text-lg">Amazon • Posted 2 days ago</p>
                </div>
              </div>
            </div>

            {/* Job Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
                <MapPinIcon size={18} className="text-gray-400" />
                <div>
                  <p className="text-gray-500 text-xs">Location</p>
                  <p className="text-white text-sm font-medium">Seattle, WA (Remote)</p>
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
                {isOpen ? (
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
            </div>

            {/* Job Description Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">About the job</h2>
                <p className="text-gray-300 leading-relaxed">
                  We are looking for a talented Frontend Developer to join our team. 
                  You will be responsible for building amazing user interfaces and 
                  implementing new features for our web applications.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">What we are looking for</h2>
                <div className="text-gray-300 leading-relaxed space-y-2">
                  <p>• 5+ years of experience with React.js</p>
                  <p>• Strong understanding of JavaScript/TypeScript</p>
                  <p>• Experience with Tailwind CSS and modern styling</p>
                  <p>• Knowledge of responsive design principles</p>
                  <p>• Excellent problem-solving skills</p>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <ApplyJobDrawer />
            </div>
          </CardContent>
        </Card>

        {/* Applications Section */}
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
      </div>
    </div>
  )
}

export default Job