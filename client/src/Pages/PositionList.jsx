import {useState, useEffect} from 'react'
import Loading from '../Components/Loading';
import { useNavigate } from "react-router-dom";
import PositionTable from '../Components/PositionTable/PositionTable';

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal })
  .then((res) => res.json());
};



const EmployeePositionList = () => {
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();


  const handleChangePosition = (employee) => {
    console.log("list: ", employee)
    fetch(`/api/employees/${employee._id}`, { 
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(employee),
    }).then((res) => {

      data.forEach((employeeObj) => {
          if (employeeObj._id === employee._id) {
            employeeObj.position = employee.position
          }
      })
      setData(data);
      res.json()
    })
    // .then(() => {
    //   navigate("/");
    // })
    // .catch((error) => {
    //   throw error;
    // })
    // .finally(() => {
    //   setUpdateLoading(false);
    // });
}


  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        console.log(employees)
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, [data]);

    if(loading) {
        return <Loading/>;
    }

    return <PositionTable employees={data} onChange={handleChangePosition} disabled={updateLoading}/>
}

export default EmployeePositionList;