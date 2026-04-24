import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Star, X } from 'lucide-react'

const AddSkillDialog = ({ onAddSkill, existingSkills = [] }) => {
  const [open, setOpen] = useState(false)
  const [skillData, setSkillData] = useState({
    name: '',
    proficiency: 'intermediate',
    experience: '1-3',
    category: 'technical',
    isRequired: true
  })

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-gray-500' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-blue-500' },
    { value: 'advanced', label: 'Advanced', color: 'bg-purple-500' },
    { value: 'expert', label: 'Expert', color: 'bg-green-500' }
  ]

  const experienceRanges = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5+', label: '5+ years' }
  ]

  const skillCategories = [
    { value: 'technical', label: 'Technical' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'design', label: 'Design' },
    { value: 'management', label: 'Management' },
    { value: 'language', label: 'Language' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (skillData.name.trim() && !existingSkills.some(s => s.name === skillData.name)) {
      onAddSkill(skillData)
      setSkillData({
        name: '',
        proficiency: 'intermediate',
        experience: '1-3',
        category: 'technical',
        isRequired: true
      })
      setOpen(false)
    }
  }

  const getProficiencyColor = (level) => {
    const found = proficiencyLevels.find(p => p.value === level)
    return found?.color || 'bg-gray-500'
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-125">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Add Required Skill</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add skills needed for this position
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Skill Name */}
          <div className="space-y-2">
            <Label htmlFor="skill-name" className="text-gray-300">
              Skill Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="skill-name"
              value={skillData.name}
              onChange={(e) => setSkillData({...skillData, name: e.target.value})}
              placeholder="e.g., React, Python, Project Management"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              autoFocus
            />
          </div>

          {/* Proficiency Level */}
          <div className="space-y-2">
            <Label htmlFor="proficiency" className="text-gray-300">
              Proficiency Level <span className="text-red-400">*</span>
            </Label>
            <Select 
              value={skillData.proficiency} 
              onValueChange={(value) => setSkillData({...skillData, proficiency: value})}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select proficiency level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {proficiencyLevels.map(level => (
                  <SelectItem key={level.value} value={level.value} className="hover:bg-gray-700">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${level.color}`}></div>
                      {level.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience Required */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-gray-300">
              Experience Required
            </Label>
            <Select 
              value={skillData.experience} 
              onValueChange={(value) => setSkillData({...skillData, experience: value})}
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

          {/* Skill Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-300">
              Skill Category
            </Label>
            <Select 
              value={skillData.category} 
              onValueChange={(value) => setSkillData({...skillData, category: value})}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {skillCategories.map(category => (
                  <SelectItem key={category.value} value={category.value} className="hover:bg-gray-700">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Required Toggle */}
          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="required" className="text-gray-300">
              Mandatory Skill
            </Label>
            <button
              type="button"
              onClick={() => setSkillData({...skillData, isRequired: !skillData.isRequired})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                skillData.isRequired ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  skillData.isRequired ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-white text-black hover:bg-gray-200">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Skill Badge Component to display added skills
const SkillBadge = ({ skill, onRemove }) => {
  const getProficiencyColor = (level) => {
    const colors = {
      beginner: 'bg-gray-600',
      intermediate: 'bg-blue-600',
      advanced: 'bg-purple-600',
      expert: 'bg-green-600'
    }
    return colors[level] || 'bg-gray-600'
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 group hover:border-gray-600 transition-all">
      <span className="text-white font-medium">{skill.name}</span>
      <Badge className={`${getProficiencyColor(skill.proficiency)} text-white text-xs`}>
        {skill.proficiency}
      </Badge>
      {skill.experience && (
        <span className="text-gray-400 text-xs">{skill.experience} yrs</span>
      )}
      {skill.isRequired && (
        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
      )}
      <button
        type="button"
        onClick={() => onRemove(skill.name)}
        className="ml-1 hover:text-white text-gray-500"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

export { AddSkillDialog, SkillBadge }