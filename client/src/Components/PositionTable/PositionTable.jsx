import { useState } from 'react';
import './PositionTable.css';


const PositionTable = ({employees, onChange}) => {
    const [searchPosition, setSearchPosition] = useState('');
    

const employeeDisplay = employees.filter(
  employee => employee.position.toLowerCase().includes(searchPosition.toLowerCase())
 )

return (
    <div className='PositionTable'>
        <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position<input
              type='text'
              value={searchPosition}
              onChange={({target}) => setSearchPosition(target.value)}
              placeholder="Employee position"></input></th>          
        </tr>
      </thead>
      <tbody>
        {employeeDisplay.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>         
            <td>{employee.level}</td>
            <td><input
            type='text'
            defaultValue={employee.position}
            onBlur={(e) => onChange({...employee, position: e.target.value})}
            ></input></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
)
}

export default PositionTable;