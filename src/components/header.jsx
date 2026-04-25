
// import React from 'react'
// import { Button } from './ui/button'

// const Header = () => {
//   return (
//     <nav className='background-color:black flex justify-between items-center px-3 py-2'>
//         <img  src='../../public/logo.png' className='w-25 h-15' alt='logo'/>

//         <div className='flex gap-2'>
//             <Button variant='secondary'>login</Button>
//             <Button  variant="default">job post</Button>

//         </div>
//     </nav>
//   )
// }

// export default Header

import React from 'react'
import { Button } from './ui/button'
import { Menu, X, Briefcase, LogIn } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ApplyJob from './applyJob'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCandidate, setIsCandidate] = useState(true) // true = candidate, false = employer
  return (
    <nav className='bg-black border-b border-gray-800 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center space-x-3'>
            <Link to='/'>
              <img src='/logo.png' className='w-auto h-16 object-contain' alt='logo'/>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-4'>
            <Button variant='ghost' className='text-gray-300 hover:text-white hover:bg-gray-800'>
              Find Jobs
            </Button>
            <Button variant='ghost' className='text-gray-300 hover:text-white hover:bg-gray-800'>
              Companies
            </Button>
            <Button variant='ghost' className='text-gray-300 hover:text-white hover:bg-gray-800'>
              Resources
            </Button>
            <div className='h-6 w-px bg-gray-800 mx-2'></div>
            <Button variant='secondary' className='gap-2 bg-gray-800 text-white hover:bg-gray-700 border-gray-700'>
              <LogIn className='w-4 h-4' />
              Login
            </Button>
            {isCandidate ? (
              <ApplyJob />
            ):(
              <>
                <Link to={'/post-job'}>
              <Button variant='default' className='gap-2 bg-amber-400 text-white hover:bg-amber-500'>
              <Briefcase className='w-4 h-4 text-black' />
              Post a Job
            </Button>
            </Link>
              </>

            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <Button 
              variant='ghost' 
              size='icon'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-gray-300'
            >
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-gray-800'>
            <div className='flex flex-col space-y-3'>
              <Link to={'/search'}>
                <Button variant='ghost' className='justify-start text-gray-300 hover:text-white hover:bg-gray-800'>
                Find Jobs
              </Button>
              </Link>
              <Button variant='ghost' className='justify-start text-gray-300 hover:text-white hover:bg-gray-800'>
                Companies
              </Button>
              <Button variant='ghost' className='justify-start text-gray-300 hover:text-white hover:bg-gray-800'>
                Resources
              </Button>
              <div className='border-t border-gray-800 pt-3'></div>
              <Button variant='secondary' className='gap-2 bg-gray-800 text-white'>
                <LogIn className='w-4 h-4' />
                Login
              </Button>
              {isCandidate ? (
              <ApplyJob />
            ):(
              <>
                <Link to={'/post-job'}>
              <Button variant='default' className='gap-2 bg-amber-400 text-white hover:bg-amber-500'>
              <Briefcase className='w-4 h-4 text-black' />
              Post a Job
            </Button>
            </Link>
              </>

            )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header