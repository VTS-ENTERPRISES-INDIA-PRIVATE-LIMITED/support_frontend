import React, { useState } from "react";
import axios from "axios"; 
import { Description } from "@mui/icons-material";

function TicketDetailsForm({ formData, handleInputChange, handleFormCancel, refreshTickets }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   const handleUpdateStatus = (ticketId) => {
//     axios
//       .put(`http://localhost:5000/ticket/updateticketstatus/${ticketId}`)
//       .then((response) => {
//         console.log("AssignedStatus updated successfully:", response.data);
//         // Optionally refetch tickets after the update
//         fetchTickets();
//       })
//       .catch((error) => {
//         console.error("Error updating AssignedStatus:", error);
//       });
//   };

  const handleFormSave = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.put(
        `http://localhost:5000/ticket/updateTicket/${formData.TicketId}`,
        {
          DueDate:formData.DueDate,
          Description: formData.Description,
          Status: formData.Status, 
        }
      );
  
      if (response.status === 200) {
        alert("Ticket updated successfully!");
        refreshTickets();  // Refresh ticket list
        handleFormCancel(); // Close the form after user clicks "OK" on alert
      } else {
        alert("Failed to update ticket.");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error updating the ticket:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="form-overlay">
      <div className="ticket-details-form">
        <button className="close-button" onClick={handleFormCancel}>
          X
        </button>
        <h2>Ticketing Details</h2>
        {error && <p className="error-message">{error}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleFormSave}>
          {/* Form Fields */}
          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="ticket-id">Ticket ID:</label>
            <input
              type="text"
              id="ticket-id"
              name="TicketId"
              value={formData.TicketId}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-id">Product ID:</label>
            <input
              type="text"
              id="product-id"
              name="ProductId"
              value={formData.productId}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="customer-id">Customer ID:</label>
            <input
              type="text"
              id="customer-id"
              name="CustomerId"
              value={formData.customerId}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="assignee-name">Assigned Status:</label>
            <input
              type="text"
              id="assignee-name"
              name="AssigneeName"
              value={formData.AssignedStatus}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="created-date">Created Date:</label>
            <input
              type="text"
              id="created-date"
              name="CreatedDate"
              value={formData.CreatedDate}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="DueDate">Due Date:</label>
            <input
              type="text"
              id="DueDate"
              name="DueDate"
              rows="4"
              value={formData.DueDate}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="resolved-date">Resolved Date:</label>
            <input
              type="date"
              id="resolved-date"
              name="ResolvedDate"
              value={formData.ResolvedDate}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <input
              type="text"
              id="priority"
              name="Priority"
              value={formData.Priority}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="Subject"
              value={formData.Subject}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
             type="text"
              id="description"
              name="Description"
              rows="4"
              value={formData.Description}
              onChange={handleInputChange}
            />
          </div>
         
          <div className="form-group">
            <label htmlFor="phn-number">Phone Number:</label>
            <input
              type="text"
              id="phn-number"
              name="PhnNumber"
              value={formData.PhnNumber}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="Status"  // Ensure this matches the formData key
              value={formData.Status}
              onChange={handleInputChange}
            >
              <option value="CLOSED">CLOSED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Saving..." : "Save"}
              </button>
             <button
              type="button"
              className="cancel-button"
              onClick={handleFormCancel}>
              Cancel
              </button>
              
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketDetailsForm;
