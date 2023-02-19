import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch('/robert', { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/robert/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const updateBoolean = (employee, id) => {
  fetch(`/api/employees/${employee._id}`, { 
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(employee, id),
  }).then((res) => res.json())
}


const RobertList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleChangeBoolean = (employee, id) => {
    employee.present = !employee.present
    updateBoolean(employee, id)

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    
    });
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={data} onDelete={handleDelete} onChange={handleChangeBoolean} />;
};

export default RobertList;
