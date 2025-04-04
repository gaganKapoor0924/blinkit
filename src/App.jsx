import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import BrandSection from './components/BrandSection'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import QuickCommerce from './components/QuickCommerce'
import Sidebar from './components/Sidebar'
import { CubeProvider } from '@cubejs-client/react'
import cubejs from "@cubejs-client/core";


function App() {

  const CUBEJS_API_URL = "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1";
  const CUBEJS_API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZElkIjoiNDkiLCJleHAiOjE3NDM0OTYyMTIsImlzcyI6ImN1YmVjbG91ZCJ9.luqfkt0CQW_B01j5oAvl_8hicbFzPmyLXfvEZYJbej4"; // Replace with your actual token
  
  const cubejsApi = cubejs(CUBEJS_API_TOKEN, { apiUrl: CUBEJS_API_URL });


  return (
    <CubeProvider cubeApi={cubejsApi}>
    <BrowserRouter>
    
      <div className='wrapper'>
        <div className='left_section'>
          <div className='top_section'>
            <BrandSection />
          </div>
           <Sidebar/>
        </div>
        <div className='right_section'>
          <Routes>
            <Route path="/" element={<QuickCommerce />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
    </CubeProvider>
  )
}

export default App
