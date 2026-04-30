// src/components/ApplyJob.jsx
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, FileText, Loader2, CheckCircle, X } from 'lucide-react'
import { useParams } from "react-router-dom"
import { useUser } from "@clerk/react"
import Usefetch from "@/hooks/useFetch"
import { CreateApplication } from "@/api/apiapplications"
import { useState, useEffect } from "react"

export function ApplyJob() {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [resumeError, setResumeError] = useState(false)
  const { user } = useUser()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { id} = useParams()
  
  // Form state
  const [formData, setFormData] = useState({      
    name: '',          
    resume: null,          
    skills: '',    
    experience: '',       
    education: '' 
  })

  // Use the Usefetch hook
  const { fn: createApplicationFn, data, loading, error } = Usefetch(CreateApplication, {
    userId: user?.id,
    jobId: id,
    formData:formData
  })

  const handleChange = (e) => {
    const { id, value, files } = e.target
    
    // Resume file handling
    if (id === "resume") {
      if (files && files[0]) {
        setFormData(prev => ({ ...prev, resume: files[0] }))
        setSelectedFile(files[0].name)
        setResumeError(false)
        console.log("File selected:", files[0].name)
      } else {
        setFormData(prev => ({ ...prev, resume: null }))
        setSelectedFile(null)
        setResumeError(true)
      }
    } 
    // Other fields
    else {
      setFormData(prev => ({ ...prev, [id]: value }))
    }
  }

  const handleRadioChange = (value) => {
    setFormData(prev => ({ ...prev, education: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name) {
      alert("Please enter your name")
      return
    }
    if (!formData.experience) {
      alert("Please enter your experience")
      return
    }
    if (!formData.skills) {
      alert("Please enter your skills")
      return
    }
    if (!formData.education) {
      alert("Please select your education")
      return
    }
    if (!formData.resume) {
      alert("Please upload your resume")
      setResumeError(true)
      return
    }
    
    if (!user?.id) {
      alert("Please sign in to apply")
      return
    }
    
    // Call API
    await createApplicationFn()
  }

  // Handle success
  useEffect(() => {
    if (data && data.success) {
      alert("Application submitted successfully!")
      setOpen(false)
      setFormData({
        name: '',
        resume: null,
        skills: '',
        experience: '',
        education: ''
      })
      setSelectedFile(null)
      setResumeError(false)
    }
  }, [data])

  // Handle error
  useEffect(() => {
    if (error) {
      alert("Error submitting application: " + (error.message || "Something went wrong"))
    }
  }, [error])

  const ProfileFormComponent = ({ className }) => (
    <form onSubmit={handleSubmit} className={cn("space-y-6 pb-4", className)}>
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-300 font-medium">
          Name <span className="text-red-400">*</span>
        </Label>
        <Input 
          id="name"
          placeholder="Your name" 
          type="text" 
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
        />
      </div>

      {/* Experience Field */}
      <div className="space-y-2">
        <Label htmlFor="experience" className="text-gray-300 font-medium">
          Experience <span className="text-red-400">*</span>
        </Label>
        <Input 
          id="experience"
          placeholder="Years of experience (e.g., 3)" 
          type="number" 
          value={formData.experience}
          onChange={handleChange}
          required
          disabled={loading}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
        />
      </div>

      {/* Technical Skills Field */}
      <div className="space-y-2">
        <Label htmlFor="skills" className="text-gray-300 font-medium">
          Technical Skills <span className="text-red-400">*</span>
        </Label>
        <Input 
          id="skills"
          placeholder="e.g., React, Python, Node.js" 
          type="text" 
          value={formData.skills}
          onChange={handleChange}
          required
          disabled={loading}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
        />
        <p className="text-gray-500 text-xs">Separate multiple skills with commas</p>
      </div>

      {/* Education Radio Group */}
      <FieldSet className="w-full space-y-3">
        <FieldLegend variant="label" className="text-gray-300 font-medium">
          Education <span className="text-red-400">*</span>
        </FieldLegend>
        <FieldDescription className="text-gray-500 text-sm">
          Select your highest level of education
        </FieldDescription>
        <RadioGroup 
          value={formData.education} 
          onValueChange={handleRadioChange}
          className="space-y-2"
        >
          <Field orientation="horizontal" className="flex items-center gap-3">
            <RadioGroupItem 
              value="intermediate" 
              id="intermediate" 
              className="border-gray-600 text-white data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <FieldLabel htmlFor="intermediate" className="font-normal text-gray-300 cursor-pointer">
              Intermediate
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="flex items-center gap-3">
            <RadioGroupItem 
              value="graduate" 
              id="graduate" 
              className="border-gray-600 text-white data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <FieldLabel htmlFor="graduate" className="font-normal text-gray-300 cursor-pointer">
              Graduate
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="flex items-center gap-3">
            <RadioGroupItem 
              value="postgraduate" 
              id="postgraduate" 
              className="border-gray-600 text-white data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <FieldLabel htmlFor="postgraduate" className="font-normal text-gray-300 cursor-pointer">
              Post Graduate
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>

      {/* Resume Upload */}
      <div className="space-y-2">
        <Label htmlFor="resume" className="text-gray-300 font-medium">
          Resume/CV <span className="text-red-400">*</span>
        </Label>
        <div className="relative">
          <Input  
            id="resume"
            name="resume"
            type="file"  
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            disabled={loading}
            className={cn(
              "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600",
              "file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0",
              "file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600",
              "cursor-pointer",
              resumeError && "border-red-500 border-2"
            )}
          />
          {selectedFile && (
            <div className="mt-2 text-sm text-green-400 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>{selectedFile}</span>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, resume: null }))
                  setSelectedFile(null)
                  setResumeError(false)
                  // Clear file input
                  const fileInput = document.getElementById('resume')
                  if (fileInput) fileInput.value = ''
                }}
                className="ml-2 text-gray-400 hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {resumeError && !selectedFile && (
            <p className="text-red-400 text-sm mt-1">Please select a file</p>
          )}
        </div>
        <p className="text-gray-500 text-xs">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="default" 
        size="lg" 
        disabled={loading}
        className="w-full bg-white text-black hover:bg-gray-200 font-semibold gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            Submit Application
          </>
        )}
      </Button>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="gap-2 px-2 bg-amber-400 text-white hover:bg-amber-500">
            <Briefcase className="w-4 h-4 text-black" />
            Apply Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-125 bg-gray-900 border-gray-800 text-white max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Apply for Position</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please fill out the form below to submit your application
            </DialogDescription>
          </DialogHeader>
          <ProfileFormComponent />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" className="gap-2 px-2 bg-amber-400 text-white hover:bg-amber-500">
          <Briefcase className="w-4 h-4" />
          Apply Now
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-900 border-gray-800">
        <DrawerHeader className="text-left border-b border-gray-800 pb-4">
          <DrawerTitle className="text-2xl text-white">Apply for Position</DrawerTitle>
          <DrawerDescription className="text-gray-400">
            Please fill out the form below to submit your application
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto px-4 py-4 max-h-[calc(90vh-200px)] scrollbar-hide">
          <ProfileFormComponent />
        </div>
        
        <DrawerFooter className="pt-4 border-t border-gray-800">
          <DrawerClose asChild>
            <Button variant="outline" className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplyJob