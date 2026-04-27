

import { Show, SignIn, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import React,{useEffect} from 'react'
import { Button } from './ui/button'
import { Menu, X, Briefcase, LogIn, BriefcaseBusiness, Heart } from 'lucide-react'
import { useState } from 'react'
import { href, Link, useSearchParams } from 'react-router-dom'
import ApplyJob from './applyJob'
 import { dark } from '@clerk/ui/themes'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCandidate, setIsCandidate] = useState(true) // true = candidate, false = employer
  const [showsignin,setShowSigin]=useState(false)
  const [search ,setSearch]=useSearchParams()


  const {user}=useUser()
  console.log("user",user);
  useEffect(() => {
  
    if(search.get("sign-in")) setShowSigin(true)
  
    
  }, [search])
  
  useEffect(() => {
   setIsCandidate(user?.unsafeMetadata?.role==="candidate" ? true : false)
  }, [])
  
 const  handleOverlayClick=(e)=>{
  if(e.target===e.currentTarget){
    setShowSigin(false)
    setSearch({})
  }
 }
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
            <Link to={"/search"}> 
              <Button variant='ghost' className='text-gray-300 hover:text-white hover:bg-gray-800'>
              Find Jobs
            </Button>
            </Link>
            <Link to={"/companies"}>
              <Button variant='ghost' className='text-gray-300 hover:text-white hover:bg-gray-800'>
              Companies
            </Button>
            </Link>
            <Link to={"/resources"}>
              <Button variant='ghost' className='text-gray-300 hover:text-white hover:bg-gray-800'>
              Resources
            </Button>
            </Link>
            <div className='h-6 w-px bg-gray-800 mx-2'></div>
            <div className='flex gap-8'>
                 <Show when="signed-out">
               <Button variant='secondary' onClick={()=>setShowSigin(true)} className='gap-2 bg-gray-800 text-white' >
                <LogIn className='w-4 h-4' />
                Login
              </Button>
              </Show>
              <Show when="signed-in">
                <UserButton >
                 <UserButton.MenuItems>
                  <UserButton.Link
                   label='my jobs'
                   labelIcon=<BriefcaseBusiness size={15} />
                   href={"/my-job"}
                   />

                  <UserButton.Link
                   label='saved jobs'
                   labelIcon=<Heart size={15} />
                   href={"/saved-jobs"}
                   />
                    
                  
                 </UserButton.MenuItems>
                </UserButton>
            </Show>
            </div>
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
              <Link to={"/companies"}>
                <Button variant='ghost' className='justify-start text-gray-300 hover:text-white hover:bg-gray-800'>
                Companies
              </Button>
              </Link>
              <Link to={"/resources"}>
                <Button variant='ghost' className='justify-start text-gray-300 hover:text-white hover:bg-gray-800'>
                Resources
              </Button>
              </Link>
              <div className='border-t border-gray-800 pt-3'></div>
              
              <div className='flex gap-8'>
                 <Show when="signed-out">
               <Button variant='secondary' className='gap-2 bg-gray-800 text-white'>
                <LogIn className='w-4 h-4' />
                Login
              </Button>
                {/* <SignInButton />
                <SignUpButton /> */}
              </Show>
              <Show when="signed-in">
                <UserButton />
            </Show>
              </div>
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
       {showsignin && (
          <div className='fixed flex items-center justify-center inset-0 backdrop-blur-sm' onClick={handleOverlayClick}>
            <SignIn forceRedirectUrl={"/onboarding"} fallbackRedirectUrl={"/onboarding"} appearance={{
              theme:dark
            }}/>
          </div>
        )}
    </nav>

    
  )
}

export default Header