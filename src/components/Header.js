import React from 'react';
import '../App.css';
import NotificationPopup from './NotificationPopUp';
import { FaEnvelope,FaCog,FaUser } from 'react-icons/fa';



function Header({ activeComponent }) {

  const headermargin = {
    margin:"20px",
    
  };  
  const getTitle = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return 'Dashboard';
      case 'AllTickets':
        return 'All Tickets';
      case 'OpenTickets':
        return 'Open Tickets';
      case 'PendingTickets':
        return 'PendingTickets';
      case 'ClosedTickets':
        return 'ClosedTickets';
      default: 
        return 'Dashboard';
    }
  };

  return (
    <div className="header">
      <h2 style={headermargin} className='text-color'>{getTitle()}</h2>
      {/* <div className="header-right">
        <input className="search-bar" type="text" placeholder="Search here" />
        <i className="user-icon"><FaUser size={24} style={{ marginRight: '5px' }}/></i>
        <i className="settings-icon"><FaCog size={24} style={{ marginRight: '10px' }}/></i>
        <i className="Message-icon"><FaEnvelope size={24} style={{ marginRight: '5px' }}/></i>
        <NotificationPopup /> {/* Add NotificationPopup here */}
      {/* </div> */} 
    </div>
  );
}

export default Header;
