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
      element:<PostJob />
    },
    {
      path:'/my-job',
      element:<MyJobs />
    },
    {
      path:'/apply-job',
      element:<ApplyJob />
    },
    {
      path:'/job/1',
      element:<Job />
    },
    {
      path:'/search',
      element:<JobListing />
    },
    {
      path:'/onboarding',
      element:<Onboarding />
    },
    {
      path:'/saved-jobs',
      element:<SavedJob />
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
