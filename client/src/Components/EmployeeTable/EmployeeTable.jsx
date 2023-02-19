import { Link } from "react-router-dom";
import {useState} from 'react';
import "./EmployeeTable.css";


const EmployeeTable = ({ employees, onDelete, onChange, randomNr }) => {

  const [searchLevel, setSearchLevel] = useState('')
  const [searchPosition, setSearchPosition] = useState('')

  const employeeDisplay = employees.filter(
  employee => employee.level.toLowerCase().includes(searchLevel.toLowerCase()) && employee.position.toLowerCase().includes(searchPosition.toLowerCase())
  )

  /*const filterPosition = employees.filter(
    ({position}) => position.toLowerCase().includes(searchPosition.toLowerCase())
  )*/


  return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Middle name</th>
          <th>Last name</th>
          <th>Present</th>
          <th>Level<input 
              type='url' 
              value={searchLevel}
              onChange={({target}) => setSearchLevel(target.value)}
              placeholder="filter Level"></input></th>
          <th>Position<input
              type='text'
              value={searchPosition}
              onChange={({target}) => setSearchPosition(target.value)}
              placeholder="filter Position"></input></th>
              
          
        </tr>
      </thead>
      <tbody>
        {employeeDisplay.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.firstName}</td>
            <td>{employee.middleName}</td>            
            <td>{employee.lastName}</td>
            <td><form>
              <input 
              type='checkbox'
              onChange={() => onChange(employee)}
              checked={employee.present}
              />
              </form></td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.height = randomNr}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
        };

export default EmployeeTable;
