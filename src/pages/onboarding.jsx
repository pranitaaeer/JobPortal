import { Button } from '@/components/ui/button';
import React from 'react';
import { Briefcase, Users, ArrowRight } from 'lucide-react';

const Onboarding = () => {
    const handleRoleSelection = (role) => {
        console.log(`  ${role} role selected successfully`);
    }
    
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6">
                        <Users className="w-10 h-10 text-gray-300" />
                    </div>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
                        I am a...
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Choose your role to get started with your personalized experience
                    </p>
                </div>

                {/* Role Selection Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Candidate Button */}
                    <Button
                        variant="secondary"
                        className="h-40 text-2xl font-semibold bg-gray-900 border-2 border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-all duration-300 group flex flex-col gap-3"
                        onClick={() => handleRoleSelection("candidate")}
                    >
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Briefcase className="w-8 h-8 text-blue-400" />
                        </div>
                        <span className="text-white">Candidate</span>
                        <span className="text-xs text-gray-500 font-normal">Looking for job opportunities</span>
                    </Button>

                    {/* Recruiter Button */}
                    <Button
                        variant="secondary"
                        className="h-40 text-2xl font-semibold bg-gray-900 border-2 border-gray-700 hover:border-purple-500 hover:bg-gray-800 transition-all duration-300 group flex flex-col gap-3"
                        onClick={() => handleRoleSelection("recruiter")}
                    >
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users className="w-8 h-8 text-purple-400" />
                        </div>
                        <span className="text-white">Recruiter</span>
                        <span className="text-xs text-gray-500 font-normal">Hiring for your company</span>
                    </Button>
                </div>

                {/* Footer Note */}
                <p className="text-gray-600 text-sm mt-12 text-center">
                    You can change this later in your account settings
                </p>
            </div>
        </div>
    )
}

export default Onboarding