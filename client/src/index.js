import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import RobertList from "./Pages/Robert";
import MissingList from './Pages/PresentList'
import EquipmentList from './Pages/Equipments';
import EqLayout from "./Pages/Layout/EqLayout";
import EquipmentCreator from './Pages/EquipmentCreator';
import EquipmentUpdater from './Pages/EquipmentUpdater';
import EmployeePositionList from "./Pages/PositionList";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path:'/robert',
        element: <RobertList/>,
      },
      {
        path:'/positions',
        element: <EmployeePositionList/>,
      },
      {
        path:'/missing',
        element: <MissingList/>,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
    ],
  },
  {
    path: "/api/equipments/",
    element: <EqLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/api/equipments/",
        element: <EquipmentList />,
      },
      {
        path: "/api/equipments/create",
        element: <EquipmentCreator />,
      },
      {
        path: "/api/equipments/update/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/api/equipments/table-test",
        element: <TableTest />,
      },
      {
        path: "/api/equipments/form-test",
        element: <FormTest />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
