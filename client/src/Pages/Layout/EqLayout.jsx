import { Outlet, Link } from "react-router-dom";

import "./EqLayout.css";

const EqLayout = () => (
  <div className="EqLayout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/api/equipments/">Equipments</Link>
        </li>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Link to="/api/equipments/create">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default EqLayout;
