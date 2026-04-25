

import React,{useState} from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import {Input} from "../components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import companies from "../data/company.json"
import Autoplay from 'embla-carousel-autoplay'
import { 
  Search, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  Star,
  Clock
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ApplyJob from '@/components/applyJob'

const Landing = () => {

    const [isCandidate, setIsCandidate] = useState(true) // true = candidate, false = employer
  
  const stats = [
    { icon: TrendingUp, label: "Active Jobs", value: "10,000+" },
    { icon: Users, label: "Companies", value: "5,000+" },
    { icon: Award, label: "Happy Candidates", value: "50,000+" }
  ]

  const features = [
    {
      title: "Smart Job Matching",
      description: "AI-powered recommendations tailored to your skills",
      icon: Star
    },
    {
      title: "Quick Apply",
      description: "Apply to multiple jobs with just one click",
      icon: Clock
    },
    {
      title: "Top Companies",
      description: "Connect with industry-leading employers",
      icon: Briefcase
    }
  ]

  return (
    <main className='min-h-screen bg-black'>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <Badge className="mb-6 bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-800">
              🚀 10,000+ Jobs Posted This Week
            </Badge>
            
            <h1 className="flex flex-col items-center justify-center gap-4 mb-8">
              <span className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white">
                Find Your Dream Job
              </span>
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white">and get</span>
                <div className="relative group">
                  <img
                    src="/logo.png"
                    className='w-auto h-16 lg:h-32 sm:h-24'
                    alt="Logo"
                  />
                </div>
              </div>
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-xl max-w-2xl mx-auto mb-8">
              Join thousands of professionals who found their perfect career match through our platform
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-3 bg-gray-900 p-2 rounded-xl border border-gray-800">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input 
                    placeholder="Job title, keywords, or company"
                    className="pl-10 bg-transparent border-gray-800 focus:border-gray-600 text-white"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Location"
                    className="pl-10 bg-transparent border-gray-800 focus:border-gray-600 text-white"
                  />
                </div>
                <Button className="bg-white text-black hover:bg-gray-200 gap-2">
                  Search Jobs
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center mb-16">
              <Link to={'/search'}>
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 bg-gray-800 text-white hover:bg-gray-700">
                <Search className="w-5 h-5" />
                Find Jobs
              </Button>
              </Link>
              {isCandidate ? (
                <ApplyJob />
              ):(
                <>
                  <Link to={'/post-job'}>
                <Button size="lg" variant="default" className="gap-2 text-lg px-8 bg-amber-400 text-white hover:bg-amber-500">
                <Briefcase className="w-5 h-5 text-black" />
                Post a Job
              </Button>
              </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
              {stats.map((stat, idx) => (
                <Card key={idx} className="bg-gray-900 border-gray-800 hover:bg-gray-900/80 transition-all duration-300">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900/30 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We provide the best tools and opportunities for job seekers and employers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 group">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Carousel */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted By Leading Companies
            </h2>
            <p className="text-gray-500">
              Join 5,000+ companies hiring on our platform
            </p>
          </div>
          
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
              })
            ]}
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {companies.map((elm, index) => (
                <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                  <div className="p-2">
                    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-900/80 transition-all duration-300">
                      <CardContent className="p-4 flex items-center justify-center">
                        <img  
                          src={elm.path}
                          alt={elm.name} 
                          className="sm:h-14 object-contain w-full h-12 transition-all duration-300 "
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </main>
  )
}

export default Landing