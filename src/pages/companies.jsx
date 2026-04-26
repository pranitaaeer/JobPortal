import React, { useState } from 'react'
import { Building2, MapPin, Briefcase, Users, Search, Filter, Globe, Mail, Calendar } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')

  // Sample companies data
  const companies = [
    {
      id: 1,
      name: "Tech Corp",
      logo: "/companies/google.svg",
      industry: "Technology",
      location: "New York, NY",
      employees: "1000-5000",
      jobs: 24,
      founded: "2010",
      website: "techcorp.com",
      email: "careers@techcorp.com",
      description: "Leading technology company specializing in AI and cloud solutions",
      featured: true
    },
    {
      id: 2,
      name: "Startup Inc",
      logo: "/companies/microsoft.svg",
      industry: "Technology",
      location: "San Francisco, CA",
      employees: "50-200",
      jobs: 12,
      founded: "2018",
      website: "startupinc.com",
      email: "hr@startupinc.com",
      description: "Fast-growing startup revolutionizing the fintech space",
      featured: false
    },
    {
      id: 3,
      name: "Design Studio",
      logo: "/companies/amazon.svg",
      industry: "Design",
      location: "Remote",
      employees: "20-50",
      jobs: 8,
      founded: "2015",
      website: "designstudio.com",
      email: "hello@designstudio.com",
      description: "Creative agency specializing in UI/UX and branding",
      featured: true
    },
    {
      id: 4,
      name: "Cloud Solutions",
      logo: "/companies/netflix.svg",
      industry: "Cloud Computing",
      location: "Austin, TX",
      employees: "500-1000",
      jobs: 18,
      founded: "2012",
      website: "cloudsolutions.com",
      email: "careers@cloudsolutions.com",
      description: "Enterprise cloud migration and management services",
      featured: false
    },
    {
      id: 5,
      name: "Product Co",
      logo: "/companies/apple.svg",
      industry: "Product",
      location: "Remote",
      employees: "100-500",
      jobs: 15,
      founded: "2016",
      website: "productco.com",
      email: "jobs@productco.com",
      description: "Building innovative products for modern businesses",
      featured: true
    },
    {
      id: 6,
      name: "App Masters",
      logo: "/companies/meta.svg",
      industry: "Mobile",
      location: "Los Angeles, CA",
      employees: "200-500",
      jobs: 10,
      founded: "2014",
      website: "appmasters.com",
      email: "careers@appmasters.com",
      description: "Top mobile app development company",
      featured: false
    }
  ]

  const industries = ['all', 'Technology', 'Design', 'Cloud Computing', 'Product', 'Mobile']

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  })

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-gray-300" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Top Companies
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing companies hiring right now
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-gray-400 text-sm">Total Companies</p>
              <p className="text-2xl font-bold text-white">{companies.length}+ Companies</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">10,000+ Jobs Available</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies by name or description..."
                className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600 h-12"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  variant={selectedIndustry === industry ? "default" : "outline"}
                  className={selectedIndustry === industry 
                    ? "bg-white text-black hover:bg-gray-200" 
                    : "bg-gray-900 border-gray-800 text-white hover:bg-gray-800"
                  }
                >
                  {industry === 'all' ? 'All' : industry}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 group">
                <CardContent className="p-6">
                  {/* Company Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Building2 className="w-7 h-7 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {company.name}
                        </h3>
                        {company.featured && (
                          <Badge className="bg-yellow-600 text-white text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                        <MapPin size={14} />
                        {company.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {company.description}
                  </p>

                  {/* Company Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Briefcase size={14} />
                      <span>{company.jobs} jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Users size={14} />
                      <span>{company.employees}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar size={14} />
                      <span>Est. {company.founded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Globe size={14} />
                      <span className="truncate">{company.website}</span>
                    </div>
                  </div>

                  {/* Industry Badge */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                      {company.industry}
                    </Badge>
                    <Button variant="outline" size="sm" className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                      View Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-4">
              <Building2 className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No companies found</h3>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Companies