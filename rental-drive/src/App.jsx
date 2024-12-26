import { useState } from 'react';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import AdminRouter from './router/AdminRouter';
import UserRouter from './router/UserRouter';
import './App.css';


function App() {


  return (
      <Router>
        
              <Routes>
                      <Route path="/admin/*" element={<AdminRouter />} />
                      <Route path="/*" element={<UserRouter />} />
              </Routes>
            
      </Router>
       
              
        
  )
}

export default App
