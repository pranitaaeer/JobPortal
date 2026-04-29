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
import { Briefcase, FileText } from 'lucide-react'
import { useParams } from "react-router-dom"
import { useUser } from "@clerk/react"
import Usefetch from "@/hooks/useFetch"
import { CreateApplication } from "@/api/apiapplications"
import { useState } from "react"
export function ApplyJob() {
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  let userId=user?.id
  const {id}=useParams()
  console.log("id",id);
   const [formData, setFormData] = useState({
      job_id: '',           
      candidate_id: '',       
      name: '',          
      status: '',        
      resume: '',          
      skils: '',    
      experiance: '',       
      education: '' 
    })
      const {fn:createApplication,data:applicationData}=Usefetch(CreateApplication,userId,FormData,id)
    
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="gap-2 px-2 bg-amber-400 text-white hover:bg-amber-500">
            <Briefcase className="w-4 h-4 text-black" />
            Apply Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-125 bg-gray-900 border-gray-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Apply for Position</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please fill out the form below to submit your application
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" className="gap-2 px-2 bg-amber-400 text-white hover:bg-amber-500 ">
          <Briefcase className="w-4 h-4" />
          Apply Now
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-900 border-gray-800 h-[90vh] max-h-[90vh]">
        <DrawerHeader className="text-left border-b border-gray-800 pb-4">
          <DrawerTitle className="text-2xl text-white">Apply for Position</DrawerTitle>
          <DrawerDescription className="text-gray-400">
            Please fill out the form below to submit your application
          </DrawerDescription>
        </DrawerHeader>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <ProfileForm />
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

function ProfileForm({ className }) {
  return (
    <form className={cn("space-y-6 pb-4", className)}>
      {/* Experience Field */}
      <div className="space-y-2">
        <Label htmlFor="experience" className="text-gray-300 font-medium">
          Experience <span className="text-red-400">*</span>
        </Label>
        <Input 
          id="experience"
          placeholder="Years of experience (e.g., 3)" 
          type="text" 
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
        <RadioGroup defaultValue="monthly" className="space-y-2">
          <Field orientation="horizontal" className="flex items-center gap-3">
            <RadioGroupItem 
              value="monthly" 
              id="plan-monthly" 
              className="border-gray-600 text-white data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <FieldLabel htmlFor="plan-monthly" className="font-normal text-gray-300 cursor-pointer">
              Intermediate
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="flex items-center gap-3">
            <RadioGroupItem 
              value="yearly" 
              id="plan-yearly" 
              className="border-gray-600 text-white data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <FieldLabel htmlFor="plan-yearly" className="font-normal text-gray-300 cursor-pointer">
              Graduate
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="flex items-center gap-3">
            <RadioGroupItem 
              value="lifetime" 
              id="plan-lifetime" 
              className="border-gray-600 text-white data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <FieldLabel htmlFor="plan-lifetime" className="font-normal text-gray-300 cursor-pointer">
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
            type="file"  
            accept=".pdf, .doc, .docx"
            className="mb-4 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer texxt-center"
          />
        </div>
        <p className="text-gray-500 text-xs">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="default" 
        size="lg" 
        className="w-full bg-white text-black hover:bg-gray-200 font-semibold gap-2 sticky bottom-0"
      >
        <FileText className="w-4 h-4" />
        Submit Application
      </Button>
    </form>
  )
}

export default ApplyJob