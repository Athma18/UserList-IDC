import React from 'react';
import Auth from './Components/Auth';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path='/register' element={<Auth register={true}/>}/>
        <Route path='/login' element={<Auth/>}/>
      </Routes>
    
  );
};

export default App;
