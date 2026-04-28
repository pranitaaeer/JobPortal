import React, { useEffect, useState } from 'react'
import { Building2, MapPin, Briefcase, Users, Search, Filter, Globe, Mail, Calendar } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Usefetch from '@/hooks/useFetch'
import { getComapnies } from '@/api/apicompany'
import { useSession } from '@clerk/react'

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const {session, isLoaded} = useSession()
  const {fn: fetchComapnies, data: companyData, loading} = Usefetch(getComapnies, {})
 
  useEffect(() => {
    if(isLoaded && session) fetchComapnies()
  }, [isLoaded, session])
  
  console.log("company data", companyData);

  if(!isLoaded || loading) {
    return(
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">{!isLoaded ? "Loading..." : "Fetching companies..."}</div>
      </div>
    )
  }

  // Add safety check for companyData
  if (!companyData || !Array.isArray(companyData)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">No companies data available</div>
      </div>
    )
  }

  // Get unique industries from companyData
  const industries = ['all', ...new Set(companyData.map(company => company.industry).filter(Boolean))]

  const filteredCompanies = companyData.filter(company => {
    const matchesSearch = company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
              <p className="text-2xl font-bold text-white">{filteredCompanies.length}+ Companies</p>
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
                    <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {company.logo_url ? (
                        <img src={company.logo_url} alt='company-logo' className="w-11 text-gray-400" />
                      ) : (
                        <Building2 className="w-6 h-6 text-gray-400" />
                      )}
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
                        {company.location || 'Location not specified'}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {company.description || 'No description available'}
                  </p>

                  {/* Company Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Briefcase size={14} />
                      <span>{company.jobs || 0} jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Users size={14} />
                      <span>{company.employees || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar size={14} />
                      <span>Est. {company.founded || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Globe size={14} />
                      <span className="truncate">{company.website || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Industry Badge */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                      {company.industry || 'Uncategorized'}
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