import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployeeForm from './AddEmployeeForm';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://pinfinbackend.onrender.com/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return formattedDate;
  }

  return (
    <div className="container mt-4">
      <AddEmployeeForm />
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Reporting Person</th>
            <th>Experience (Years)</th>
            <th>Salary ($)</th>
            <th>LinkedIn</th>
            <th>Government Proof</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.fullName}</td>
              <td>{formatDate(employee.dob)}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{formatDate(employee.dateOfJoining)}</td>
              <td>{employee.reportingPerson?.fullName || 'N/A'}</td>
              <td>{employee.experience}</td>
              <td>${employee.salary}</td>
              <td><a href={employee.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></td>
              <td>
  <a href={employee.governmentProof} target="_blank" rel="noopener noreferrer">
    Government Proof
  </a>
</td>
              <td>
                <Link to={`/edit/${employee._id}`} className="btn btn-primary btn-sm mr-2">Edit</Link>
                <Link to={`/view/${employee._id}`} className="btn btn-info btn-sm mr-2">View</Link>
                <button onClick={() => handleDelete(employee._id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
