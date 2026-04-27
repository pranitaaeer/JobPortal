import './App.css'
import Landing from './pages/landing'
import AppLayout from './layouts/applayout'
import PostJob from './pages/postJob';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyJobs from './pages/myJobs';
import CreatedJob from './components/CreatedJob';
import ApplyJob from './components/applyJob';
import Job from './pages/job';
import JobListing from './pages/jobListing';
import Onboarding from './pages/onboarding';
import SavedJob from './pages/savedJob';
import Companies from './pages/companies';
import Resources from './pages/resources';
import ProtectdRoutes from './components/protectdRoutes';
function App() {

  const router=createBrowserRouter([{
    element:<AppLayout/>,
    children:[
      {
      path:'/',
      element:<Landing/>
    },
    {
      path:'/post-job',
      element:(
        <ProtectdRoutes>
          <PostJob />
        </ProtectdRoutes>
      )
    },
    {
      path:'/my-job',
      element:(
        <ProtectdRoutes>
          <MyJobs />
        </ProtectdRoutes>
      )
    },
    {
      path:'/apply-job',
      element:(
        <ProtectdRoutes>
          <ApplyJob />
        </ProtectdRoutes>
      )
    },
    {
      path:'/job/1',
      element:(
        <ProtectdRoutes>
          <Job />
        </ProtectdRoutes>
      )
    },
    {
      path:'/search',
      element:(
        <ProtectdRoutes>
          <JobListing />
        </ProtectdRoutes>
      )
    },
    {
      path:'/onboarding',
      element:(
        <ProtectdRoutes>
          <Onboarding />
        </ProtectdRoutes>
      )
    },
    {
      path:'/saved-jobs',
      element:(
        <ProtectdRoutes>
          <SavedJob />
        </ProtectdRoutes>
      )
    },
    {
      path:'/companies',
      element:<Companies />
    },
      {
      path:'/resources',
      element:<Resources />
    },
  ]
  }])
  return (
    <RouterProvider router={router} />

  )
}

export default App
