import React, { Component } from 'react';

class EmployeeTable extends Component {
  state = {
    employees: [],
    currentPage: 1,
    employeesPerPage: 10,
    loading: true,
  };

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      this.setState({ employees: data, loading: false });
    } catch (error) {
      alert('Failed to fetch data');
      console.error(error);
    }
  };

  handleNextPage = () => {
    const { currentPage } = this.state;
    if (currentPage < this.getTotalPages()) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  handlePreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  getTotalPages = () => {
    const { employees, employeesPerPage } = this.state;
    return Math.ceil(employees.length / employeesPerPage);
  };

  render() {
    const { employees, currentPage, employeesPerPage, loading } = this.state;
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
          <button onClick={this.handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {this.getTotalPages()}</span>
          <button onClick={this.handleNextPage} disabled={currentPage === this.getTotalPages()}>Next</button>
        </div>
      </div>
    );
  }
}

export default EmployeeTable;
