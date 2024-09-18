import React, { useState } from 'react';
import {FaBell } from 'react-icons/fa';
import './NotificationPopup.css'; // Import your CSS file for styling

const NotificationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-container">
      <button className="notification-icon" onClick={togglePopup}>
      <FaBell size={24} />{/* Notification icon */}
      </button>

      {isOpen && (
        <div className="popup">
          <div className="popup-header">
            <h2>Messaging Updates</h2>
          </div>
          <div className="popup-body">
            <p>No new messages.</p> {/* You can dynamically update this */}
          </div>
          <button className="close-button" onClick={togglePopup}>
            &times; {/* Close button */}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
