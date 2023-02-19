import { Link } from "react-router-dom";
import {useState} from 'react';
import "./EquipmentTable.css";

const EquipmentTable = ({ equipments, onDelete }) => {

  const [searchLevel, setSearchLevel] = useState('')
  const [searchPosition, setSearchPosition] = useState('')

  const equipmentDisplay = equipments.filter(
  equipment => equipment.type.toLowerCase().includes(searchLevel.toLowerCase()) // && equipment.amount === searchPosition
  )

  /*const filterPositEquipmentTableion = employees.filter(
    ({position}) => position.toLowerCase().includes(searchPosition.toLowerCase())
  )*/


  return (
  <div className="EquipmentTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type <input 
              type='text' 
              value={searchLevel}
              onChange={({target}) => setSearchLevel(target.value)}
              placeholder="filter Type"></input></th>
          <th>Amount <input
              type='text'
              value={searchPosition}
              onChange={({target}) => setSearchPosition(target.value)}
              placeholder="filter Amount"></input></th>        
        </tr>
      </thead>
      <tbody>
        {equipmentDisplay.map((equipment) => (
          <tr key={equipment._id}>
            <td>{equipment.name}</td>
            <td>{equipment.type}</td>
            <td>{equipment.amount}</td>
            <td>
              <Link to={`/api/equipments/update/${equipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equipment._id)}>
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

export default EquipmentTable;
