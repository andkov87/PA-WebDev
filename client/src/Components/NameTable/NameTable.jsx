import { Link } from "react-router-dom";
import { useState } from 'react';
import "./NameTable.css";


const NameTable = ({ employees, onChange }) => {

  const [displayName, setDisplayName] = useState(employees)



  /*const filterPosition = employees.filter(
    ({position}) => position.toLowerCase().includes(searchPosition.toLowerCase())
  )*/

  const filterByLastname = (target) => {
    const employeeDisplay = employees.filter(
      employee => employee.lastName.toLowerCase().includes(target.value)
    )

    setUpdateDisplayName(employeeDisplay);
  }

  const handleSimilarEmployees = (employee) => {
    const employeeDisplay = displayName.filter((objEployee) => employee.level === objEployee.level && employee.position === objEployee.position)
    setUpdateDisplayName(employeeDisplay);
  }

  const setUpdateDisplayName = (employeeDisplay) => {
    setDisplayName(employeeDisplay);
  }




  return (
    <div className="NameTable">
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Middle name</th>
            <th>Last name
              <label style={{ marginLeft: '35px' }} htmlFor='name'>Employee Name</label>
              <input style={{ width: '150px' }}
                type='text'
                onChange={({ target }) => filterByLastname(target)}
                placeholder="search..."></input></th>
            <th>Level</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {displayName.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.middleName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <button type="button" onClick={() => handleSimilarEmployees(employee)}>
                  Similar Employees
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default NameTable;
