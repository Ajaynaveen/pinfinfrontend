// AddEmployeeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


function AddEmployeeForm() {
  const [formData, setFormData] = useState({
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

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch list of employees for the reporting person dropdown
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://pinfinbackend.onrender.com/employees/reportingmanager');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        reportingPerson: formData.reportingPerson || null
      };
  
     
      const response = await axios.post('https://pinfinbackend.onrender.com/employees', dataToSend)
      console.log(response)

    
      alert('Employee added successfully');

      
      
      setFormData({
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
      window.location.reload();
    } catch (error) {
     
      console.error('Error adding employee:', error);
     
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" placeholder="Full Name" required />
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" placeholder="Date of Birth" required />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-control" placeholder="Phone Number" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" placeholder="Department" required />
      </div>
      <div className="form-group">
        <label>Date of Joining</label>
        <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} className="form-control" placeholder="Date of Joining" required />
      </div>
      <div className="form-group">
        <label>Reporting Person</label>
        <select name="reportingPerson" value={formData.reportingPerson} onChange={handleChange} className="form-control">
          <option value="">Select Reporting Person</option>
          {employees.map(employee => (
            <option key={employee._id} value={employee._id}>{employee.fullName}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Experience (in years)</label>
        <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="form-control" placeholder="Experience (in years)" required />
      </div>
      <div className="form-group">
        <label>Salary</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="form-control" placeholder="Salary" required />
      </div>
      <div className="form-group">
        <label>LinkedIn</label>
        <input type="text" name="linkedIn" value={formData.linkedIn} onChange={handleChange} className="form-control" placeholder="LinkedIn" required />
      </div>
      <div className="form-group">
        <label>Government Proof</label>
        <input type="text" name="governmentProof" value={formData.governmentProof} onChange={handleChange} className="form-control" placeholder="Government Proof" required />
      </div>
      <button type="submit" className="btn btn-primary">Add Employee</button>
    </form>
  );
}

export default AddEmployeeForm;
