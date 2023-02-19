import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import NameTable from "../Components/NameTable";


const fetchEmployees = (signal) => {
  return fetch("/api/employees/", { signal })
  .then((res) => res.json());
};



const NameList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);


  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((equipments) => {
        setLoading(false);
        console.log(equipments)
        setData(equipments);
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

  return <NameTable employees={data}  />;
};

export default NameList;
