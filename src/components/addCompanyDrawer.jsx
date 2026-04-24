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
import { Building2, Upload, X } from "lucide-react"

const AddCompanyDrawer = () => {
  const [open, setOpen] = React.useState(false)
  const [companyLogo, setCompanyLogo] = React.useState(null)
  const [companyName, setCompanyName] = React.useState("")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Company Data:", { companyName, logo: companyLogo })
    // Add your API call here
    alert(`Company "${companyName}" added successfully!`)
    setOpen(false)
    setCompanyName("")
    setCompanyLogo(null)
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCompanyLogo(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Logo Upload */}
      <div className="space-y-2">
        <Label className="text-gray-300">Company Logo</Label>
        <div className="flex items-center gap-4">
          {companyLogo ? (
            <div className="relative">
              <img 
                src={companyLogo} 
                alt="Company logo" 
                className="w-24 h-24 object-contain rounded-lg border-2 border-gray-700 bg-gray-800 p-2"
              />
              <button
                type="button"
                onClick={() => setCompanyLogo(null)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <div className="w-24 h-24 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-gray-500 transition-colors bg-gray-800/50">
                <Upload className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Upload</span>
              </div>
            </label>
          )}
        </div>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="company-name" className="text-gray-300">
          Company Name <span className="text-red-400">*</span>
        </Label>
        <Input
          id="company-name"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
          required
        />
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-2"
      >
        <Building2 className="w-4 h-4 mr-2" />
        Add Company
      </Button>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
            <Building2 className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-125 bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Add Company</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new company to your profile.
            </DialogDescription>
          </DialogHeader>
          <FormContent />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 w-full">
          <Building2 className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-900 border-gray-800">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl text-white">Add Company</DrawerTitle>
          <DrawerDescription className="text-gray-400">
            Add a new company to your profile.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <FormContent />
        </div>
        <DrawerFooter className="pt-2">
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

export default AddCompanyDrawer