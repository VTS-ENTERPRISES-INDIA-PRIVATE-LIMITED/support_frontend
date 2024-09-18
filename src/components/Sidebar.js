import React from "react";
import {
  // FaFolderOpen,
  FaHourglassHalf,
  FaCheckCircle,
  FaTicketAlt,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import VTSLogo from "../images/logovts.png";
import { TiTicket } from "react-icons/ti";
function Sidebar({ activeComponent, setActiveComponent }) {
  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="sidebar">
      <div className="logotext">
        <img src={VTSLogo} alt="" width="40px" height="40px" />
        <h2>VTS</h2>
      </div>
      <hr />
      <ul>
      <li
          style={{ display: "flex", alignItems: "center" }}
          className={activeComponent === "Dashboard" ? "active" : ""}
          onClick={() => handleClick("Dashboard")}
        >
          <MdSpaceDashboard size={18} style={{ marginRight: "10px" }} />
          Dashboard
        </li>
        <li
          style={{ display: "flex", alignItems: "center" }}
          className={activeComponent === "AllTickets" ? "active" : ""}
          onClick={() => handleClick("AllTickets")}
        >
          <TiTicket size={18} style={{ marginRight: "10px" }} />
          All Tickets
        </li>
        <li
          style={{ display: "flex", alignItems: "center" }}
          className={activeComponent === "OpenTickets" ? "active" : ""}
          onClick={() => handleClick("OpenTickets")}
        >
          <GiNotebook size={18} style={{ marginRight: "10px" }} />
          Open Tickets
        </li>
        <li
          style={{ display: "flex", alignItems: "center" }}
          className={activeComponent === "PendingTickets" ? "active" : ""}
          onClick={() => handleClick("PendingTickets")}
        >
          <FaHourglassHalf size={18} style={{ marginRight: "10px" }} />
          Pending Tickets
        </li>
        <li
          style={{ display: "flex", alignItems: "center" }}
          className={activeComponent === "ClosedTickets" ? "active" : ""}
          onClick={() => handleClick("ClosedTickets")}
        >
          <FaCheckCircle size={18} style={{ marginRight: "10px" }} />
          Closed Tickets
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
