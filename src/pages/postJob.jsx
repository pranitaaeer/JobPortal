import React, { useState, useEffect } from 'react'
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Building2, 
  Mail, 
  Users,
  Calendar,
  Clock,
  Plus,
  X,
  Loader2
} from 'lucide-react'
import AddCompanyDrawer from '@/components/addCompanyDrawer'
import { AddSkillDialog } from '@/components/AddSkillDrawer'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSession, useUser } from '@clerk/react'
import Usefetch from '@/hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { postJobs } from '@/api/apijobs'

const PostJob = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { session, isLoaded } = useSession()
  
  const [skills, setSkills] = useState([])
  const [currentSkill, setCurrentSkill] = useState('')
  const [experience, setExperience] = useState("1-3")
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',           // company name
    logo_url: '',       // company logo
    email: '',          // contact email
    website: '',        // company website
    title: '',          // job title
    description: '',    // job description
    location: '',       // location
    requirements: '',   // skills
    job_type: 'full-time',
    experience_level: '1-3',
    salary_min: '',
    salary_max: ''
  })

  // Use the Usefetch hook
  const { fn: postJobsFn, data, loading, error } = Usefetch(postJobs, formData)

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      const newSkills = [...skills, currentSkill.trim()]
      setSkills(newSkills)
      setFormData({ ...formData, requirements: newSkills })
      setCurrentSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove)
    setSkills(newSkills)
    setFormData({ ...formData, requirements: newSkills })
  }

  const experienceRanges = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5+', label: '5+ years' }
  ]

  const handleInputChange = (e) => {
    const { id, value } = e.target
    const fieldMap = {
      'job-title': 'title',
      'company-name': 'name',
      'location': 'location',
      'salary-min': 'salary_min',
      "requirements":"requirements",
      'salary-max': 'salary_max',
      'job-description': 'description',
      'contact-email': 'email',
      'website': 'website'
    }
    
    const field = fieldMap[id] || id
    setFormData({ ...formData, [field]: value })
  }

  const handleJobTypeChange = (e) => {
    setFormData({ ...formData, job_type: e.target.value })
  }

  const handleExperienceChange = (value) => {
    setExperience(value)
    setFormData({ ...formData, experience_level: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title || !formData.name || !formData.description || !formData.email || !formData.requirements) {
      alert("Please fill all required fields")
      return
    }
    
    const userId = user?.id
    await postJobsFn(userId)
  }

  // Handle success
  useEffect(() => {
    if (data && data.success) {
      alert("Job posted successfully!")
      navigate("/my-job")
    }
  }, [data, navigate])

  // Handle error
  useEffect(() => {
    if (error) {
      alert("Error posting job: " + (error.message || "Something went wrong"))
    }
  }, [error])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-gray-300" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Post a Job
          </h1>
          <p className="text-gray-400 text-lg">
            Reach thousands of qualified candidates looking for their next opportunity
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="bg-gray-900 border-gray-800 shadow-2xl">
          <CardHeader className="border-b border-gray-800 pb-6">
            <CardTitle className="text-2xl text-white">Job Details</CardTitle>
            <CardDescription className="text-gray-400">
              Fill out the information below to create your job listing
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="job-title" className="text-gray-300 font-medium">
                      Job Title <span className="text-red-400">*</span>
                    </FieldLabel>
                    <Input
                      id="job-title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Frontend Developer"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                      disabled={loading}
                      required
                    />
                    <FieldDescription className="text-gray-500 text-sm">
                      Choose a clear and descriptive title
                    </FieldDescription>
                  </Field>

                  {/* Company Name with Add Button */}
                  <div className="space-y-2">
                    <FieldLabel htmlFor="company-name" className="text-gray-300 font-medium">
                      Company Name <span className="text-red-400">*</span>
                    </FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        id="company-name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Tech Corp Inc."
                        className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                        disabled={loading}
                        required
                      />
                      <AddCompanyDrawer />
                    </div>
                    <FieldDescription className="text-gray-500 text-sm">
                      Select existing or add new company
                    </FieldDescription>
                  </div>

                  {/* Location */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="location" className="text-gray-300 font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </div>
                    </FieldLabel>
                    <Input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., New York, NY (or Remote)"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                      disabled={loading}
                    />
                  </Field>

                  {/* Job Type */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="job-type" className="text-gray-300 font-medium">
                      Job Type
                    </FieldLabel>
                    <select
                      id="job-type"
                      value={formData.job_type}
                      onChange={handleJobTypeChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                      disabled={loading}
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="remote">Remote</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* Compensation Section */}
              <div className="space-y-6 pt-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  Compensation
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="salary-min" className="text-gray-300 font-medium">
                      Minimum Salary
                    </FieldLabel>
                    <Input
                      id="salary-min"
                      type="number"
                      value={formData.salary_min}
                      onChange={handleInputChange}
                      placeholder="$50,000"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                      disabled={loading}
                    />
                  </Field>

                  <Field className="space-y-2">
                    <FieldLabel htmlFor="salary-max" className="text-gray-300 font-medium">
                      Maximum Salary
                    </FieldLabel>
                    <Input
                      id="salary-max"
                      type="number"
                      value={formData.salary_max}
                      onChange={handleInputChange}
                      placeholder="$80,000"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                      disabled={loading}
                    />
                  </Field>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-white">Job Description</h3>
                <Field className="space-y-2">
                  <FieldLabel htmlFor="job-description" className="text-gray-300 font-medium">
                    Full Description <span className="text-red-400">*</span>
                  </FieldLabel>
                  <Textarea
                    id="job-description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    className="min-h-50 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                    disabled={loading}
                    required
                  />
                  <FieldDescription className="text-gray-500">
                    Include key responsibilities, requirements, and benefits
                  </FieldDescription>
                </Field>
              </div>

              {/* Skills Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  Required Skills
                </h3>
                
                <div className="flex gap-3">
                  <Input
                    id="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="e.g., React, Python, Project Management"
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                    disabled={loading}
                    required
                  />
                  <AddSkillDialog />
                </div>
                
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-white"
                          disabled={loading}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-6 pt-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="contact-email" className="text-gray-300 font-medium">
                      Contact Email <span className="text-red-400">*</span>
                    </FieldLabel>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="hr@company.com"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                      disabled={loading}
                      required
                    />
                  </Field>

                  <Field className="space-y-2">
                    <FieldLabel htmlFor="website" className="text-gray-300 font-medium">
                      Company Website
                    </FieldLabel>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://company.com"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
                      disabled={loading}
                    />
                  </Field>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-gray-300">
                  Experience Required
                </Label>
                <Select 
                  value={experience}
                  onValueChange={handleExperienceChange}
                  disabled={loading}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select experience range" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {experienceRanges.map(range => (
                      <SelectItem key={range.value} value={range.value} className="hover:bg-gray-700">
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8 border-t border-gray-800">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-white text-black hover:bg-gray-200 font-semibold py-6 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-5 h-5 mr-2" />
                      Post Job Listing
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1 bg-gray-800 text-white hover:bg-gray-700 font-semibold py-6 text-lg"
                  disabled={loading}
                >
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 bg-gray-900/50 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Tips for a great job posting</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Be specific about requirements and responsibilities</li>
                  <li>• Highlight unique benefits and company culture</li>
                  <li>• Include salary range to attract qualified candidates</li>
                  <li>• Use clear, inclusive language</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PostJob