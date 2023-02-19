import { Link } from "react-router-dom";
import {useEffect, useState} from 'react';
import "./EmployeeTable.css";


const EmployeeTable = ({ employees, onDelete, onChange }) => {

  const [searchLevel, setSearchLevel] = useState('')
  const [searchPosition, setSearchPosition] = useState('')
  const [employeeDisplay, setEmployeeDisplay] = useState(employees)


  useEffect(() => {
    setEmployeeDisplay(employees.filter(
      employee => employee.level.toLowerCase().includes(searchLevel.toLowerCase()) && employee.position.toLowerCase().includes(searchPosition.toLowerCase())
      ));

  }, [searchLevel, searchPosition])
  

  const randomNr = () => {
    let number = Math.floor(Math.random() * (190 - 140 + 1)) + 140;
     return number;
  }


  const saveHeightData = (employee) => {
    fetch(`/api/employeeHeight/${employee._id}`, { 
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({height: employee.height}),
    }).then((res) => {
      res.json()
    })
   
}

/*const employee = await EmployeeModel.findById(req.params.id)

  employee.height = req.body.height;
  employee.save();
  res.json(employee)*/



  const handleButtonClick = () => {
    setEmployeeDisplay(prev => prev.map((employee) => {
      let randNumber = randomNr()
      return {...employee, height: randNumber}
    }))
    employeeDisplay.forEach((employee) => {
      saveHeightData(employee)
    })

  }






  /*const filterPosition = employees.filter(
    ({position}) => position.toLowerCase().includes(searchPosition.toLowerCase())
  )*/



  return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name <button type="button" onClick={() => handleButtonClick()}>
                Randomize Height
              </button></th>

          <th>Present</th>
          <th>Height</th>
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
            <td>{employee.name}</td>
            <td><form>
              <input 
              type='checkbox'
              onChange={() => onChange(employee)}
              checked={employee.present}
              />
              </form></td>
            <td>{employee.height}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>

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
