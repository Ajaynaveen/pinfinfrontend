// ViewEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,Link} from 'react-router-dom';

function ViewEmployee({ match }) {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  useEffect(() => {
   
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://pinfinbackend.onrender.com/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <div>
        <p><strong>Full Name:</strong> {employee.fullName}</p>
        <p><strong>Date of Birth:</strong> {formatDate(employee.dob)}</p>
        <p><strong>Phone Number:</strong> {employee.phoneNumber}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Date of Joining:</strong> {formatDate(employee.dateOfJoining)}</p>
        <p><strong>Reporting Person:</strong> {employee.reportingPerson?.fullName || 'null'}</p>
        <p><strong>Experience:</strong> {employee.experience}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>LinkedIn:</strong> {employee.linkedIn}</p>
        <p><strong>Government Proof:</strong> {employee.governmentProof}</p>
      </div>
      <Link to='/'>Back</Link>
    </div>
  );
}

export default ViewEmployee;
