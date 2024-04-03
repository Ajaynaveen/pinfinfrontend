// EditEmployeePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditEmployeeForm() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    fullName: '',
    dob: '',
    phoneNumber: '',
    email: '',
    department: '',
    dateOfJoining: '',
    reportingPerson: '',
    experience: '',
    salary: '',
    linkedIn: '',
    governmentProof: ''
  });

  const [reportingPersons, setReportingPersons] = useState([]);

  useEffect(() => {
   
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://pinfinbackend.onrender.com/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    const fetchReportingPersons = async () => {
      try {
        const response = await axios.get('https://pinfinbackend.onrender.com/employees');
        setReportingPersons(response.data);
      } catch (error) {
        console.error('Error fetching reporting persons:', error);
      }
    };

    fetchEmployee();
    fetchReportingPersons();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const dataToSend = {
        ...employee,
        reportingPerson: employee.reportingPerson || null
      };
  
    
      await axios.put(`https://pinfinbackend.onrender.com/employees/${id}`, dataToSend);
  
     
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };
  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={employee.fullName} onChange={handleChange} required />
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dob" value={employee.dob} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={employee.email} onChange={handleChange} required />
        </label>
        <label>
          Department:
          <input type="text" name="department" value={employee.department} onChange={handleChange} required />
        </label>
        <label>
          Date of Joining:
          <input type="date" name="dateOfJoining" value={employee.dateOfJoining} onChange={handleChange} required />
        </label>
        <label>
          Reporting Person:
          <select name="reportingPerson" value={employee.reportingPerson} onChange={handleChange}>
            <option value="">Select Reporting Person</option>
            {reportingPersons.map(person => (
              <option key={person._id} value={person._id}>{person.fullName}</option>
            ))}
          </select>
        </label>
        <label>
          Experience:
          <input type="number" name="experience" value={employee.experience} onChange={handleChange} required />
        </label>
        <label>
          Salary:
          <input type="number" name="salary" value={employee.salary} onChange={handleChange} required />
        </label>
        <label>
          LinkedIn:
          <input type="text" name="linkedIn" value={employee.linkedIn} onChange={handleChange} required />
        </label>
        <label>
          Government Proof:
          <input type="text" name="governmentProof" value={employee.governmentProof} onChange={handleChange} required />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditEmployeeForm;
