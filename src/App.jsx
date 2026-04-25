import './App.css'
import Landing from './pages/landing'
import AppLayout from './layouts/applayout'
import PostJob from './pages/postJob';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyJobs from './pages/myJobs';
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
    }
  ]
  }])
  return (
    <RouterProvider router={router} />

  )
}

export default App
