

import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';
import EditEmployeeForm from './EditEmployeeForm'; // Import your EditEmployeeForm component
import ViewEmployee from './ViewEmployee';


function App() {
  return (
  
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
        <Route path="/edit/:id" element={<EditEmployeeForm />} />
        <Route path="/view/:id" element={<ViewEmployee />} />
      </Routes>
   
  );
}

export default App;
