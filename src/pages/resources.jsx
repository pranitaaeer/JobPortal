import React, { useState } from 'react'
import { 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Search, 
  Calendar, 
  Download, 
  ExternalLink,
  Clock,
  TrendingUp,
  Briefcase,
  MessageCircle,
  Star,
  ChevronRight,
  Filter
} from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const resources = {
    articles: [
      {
        id: 1,
        title: "10 Tips for Acing Your Remote Job Interview",
        description: "Learn how to prepare for virtual interviews and stand out from other candidates.",
        category: "Interview Tips",
        readTime: "5 min read",
        date: "2024-01-15",
        author: "Sarah Johnson",
        image: "/articles/interview-tips.jpg",
        featured: true
      },
      {
        id: 2,
        title: "How to Write a Resume That Gets Noticed",
        description: "Expert advice on crafting a resume that highlights your skills and experience.",
        category: "Resume Writing",
        readTime: "8 min read",
        date: "2024-01-10",
        author: "Michael Chen",
        featured: false
      },
      {
        id: 3,
        title: "Negotiating Your Salary: A Complete Guide",
        description: "Strategies to help you get the compensation you deserve.",
        category: "Career Advice",
        readTime: "6 min read",
        date: "2024-01-05",
        author: "Emily Rodriguez",
        featured: true
      },
      {
        id: 4,
        title: "Building a Personal Brand on LinkedIn",
        description: "Tips to optimize your profile and attract recruiters.",
        category: "Networking",
        readTime: "4 min read",
        date: "2024-01-01",
        author: "David Kim",
        featured: false
      }
    ],
    videos: [
      {
        id: 1,
        title: "Mastering Behavioral Interviews",
        description: "Learn the STAR method and how to answer common questions.",
        duration: "15:30",
        category: "Interview Prep",
        views: "10K views",
        date: "2024-01-12"
      },
      {
        id: 2,
        title: "Top 5 Skills for 2024",
        description: "Discover which skills employers are looking for this year.",
        duration: "12:45",
        category: "Skill Development",
        views: "25K views",
        date: "2024-01-08"
      },
      {
        id: 3,
        title: "Networking Tips for Introverts",
        description: "Effective strategies for building professional connections.",
        duration: "10:20",
        category: "Networking",
        views: "8K views",
        date: "2024-01-03"
      }
    ],
    templates: [
      {
        id: 1,
        title: "Professional Resume Template",
        description: "Modern ATS-friendly resume template",
        type: "DOCX",
        downloads: "15K",
        size: "245 KB"
      },
      {
        id: 2,
        title: "Cover Letter Template",
        description: "Customizable cover letter for any job application",
        type: "DOCX",
        downloads: "12K",
        size: "128 KB"
      },
      {
        id: 3,
        title: "Portfolio Website Template",
        description: "HTML/CSS template for creative professionals",
        type: "ZIP",
        downloads: "8K",
        size: "1.2 MB"
      }
    ],
    guides: [
      {
        id: 1,
        title: "Complete Job Search Guide 2024",
        description: "Everything you need to know about finding your dream job",
        pages: 45,
        category: "Comprehensive",
        downloads: "20K"
      },
      {
        id: 2,
        title: "Career Change Guide",
        description: "How to successfully transition into a new industry",
        pages: 32,
        category: "Career Change",
        downloads: "12K"
      }
    ]
  }

  const categories = ['all', 'Interview Tips', 'Resume Writing', 'Career Advice', 'Networking', 'Skill Development']

  const filteredArticles = resources.articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-gray-300" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Career Resources
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to succeed in your job search journey
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
            <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-gray-400 text-sm">Articles</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
            <Video className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">30+</p>
            <p className="text-gray-400 text-sm">Video Tutorials</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
            <Download className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">20+</p>
            <p className="text-gray-400 text-sm">Templates</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
            <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">100K+</p>
            <p className="text-gray-400 text-sm">Job Seekers Helped</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources..."
              className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600 h-12"
            />
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-900 border-gray-800">
            <TabsTrigger value="articles" className="data-[state=active]:bg-white data-[state=active]:text-black text-white">
              Articles
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-white data-[state=active]:text-black text-white">
              Videos
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:text-black text-white">
              Templates
            </TabsTrigger>
            <TabsTrigger value="guides" className="data-[state=active]:bg-white data-[state=active]:text-black text-white">
              Guides
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles">
            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={activeCategory === category 
                    ? "bg-white text-black hover:bg-gray-200" 
                    : "bg-gray-900 border-gray-800 text-white hover:bg-gray-800"
                  }
                  size="sm"
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-blue-600 text-white">{article.category}</Badge>
                      {article.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                      <div className="flex items-center gap-3 text-gray-500 text-xs">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {article.readTime}
                        </span>
                        <span>By {article.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white gap-1">
                        Read More
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.videos.map((video) => (
                <Card key={video.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-full h-32 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                      <Video className="w-12 h-12 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                      <div className="text-gray-500 text-xs">
                        <span>{video.duration}</span>
                        <span className="mx-2">•</span>
                        <span>{video.views}</span>
                      </div>
                      <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                        Watch Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.templates.map((template) => (
                <Card key={template.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                          {template.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                      <div className="text-gray-500 text-xs">
                        <span>{template.downloads} downloads</span>
                        <span className="mx-2">•</span>
                        <span>{template.size}</span>
                      </div>
                      <Button size="sm" className="bg-white text-black hover:bg-gray-200 gap-2">
                        <Download size={14} />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.guides.map((guide) => (
                <Card key={guide.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <Badge className="mb-2 bg-purple-600 text-white">{guide.category}</Badge>
                        <h3 className="text-xl font-semibold text-white mb-2">{guide.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{guide.description}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                          <div className="text-gray-500 text-xs">
                            <span>{guide.pages} pages</span>
                            <span className="mx-2">•</span>
                            <span>{guide.downloads} downloads</span>
                          </div>
                          <Button size="sm" className="bg-white text-black hover:bg-gray-200 gap-2">
                            <Download size={14} />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Section */}
        <div className="mt-12 bg-linear-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
          <p className="text-gray-400 mb-6">Get the latest career tips and resources delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            <Button className="bg-white text-black hover:bg-gray-200 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resources