import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AllTickets from "./components/AllTickets"
import OpenTickets from "./components/OpenTickets";
import Sidebar from "./components/Sidebar";
import PendingTickets from "./components/PendingTickets"
import ClosedTickets from "./components/ClosedTickets"
import Dashboard from "./components/Dashboard"
import "./App.css";
// import SLA from "./components/ServiceLevelAgreement";


function App() {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);


  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
      return <Dashboard/>;
      case "AllTickets":
      return <AllTickets/>;
      case "OpenTickets":
      return <OpenTickets/>
      case "PendingTickets":
      return <PendingTickets/>
      case "ClosedTickets":
        return <ClosedTickets/>
      default:
        return <Dashboard />
        
     
    }
  };

  return (
    <div>
      <div className="App">
        <div>
          <Sidebar
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
        </div>
        <div className="main-content">
          <Header className="" activeComponent={activeComponent} />
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default App;
