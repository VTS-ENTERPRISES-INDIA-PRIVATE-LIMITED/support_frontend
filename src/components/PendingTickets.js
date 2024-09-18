import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "../App.css";
import TicketDetailsForm from "./TicketDetailsForm"; // Import TicketDetailsForm component

function PendingTickets() {
  const [data, setData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // State to hold selected ticket
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Fetch pending tickets
  const fetchTickets = () => {
    axios
      .get("http://localhost:5000/ticket/getPendingTickets")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Calculate pagination
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Total pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Function to handle the update button click and open the form
  const handleUpdateClick = (ticket) => {
    setSelectedTicket(ticket); // Set the selected ticket data
    setShowForm(true); // Show the ticket details form
  };

  // Function to handle form cancel
  const handleFormCancel = () => {
    setShowForm(false); // Close the form
    setSelectedTicket(null); // Clear selected ticket
  };

  const allColumns = [
    "TicketId",
    "productId",
    "customerId",
    "AssignedStatus",
    "Status",
    "CreatedDate",
    "DueDate",
    "ResolvedDate",
    "Priority",
    "Subject",
    "Description",
    "PhnNumber",
    "TicketCategory",
  ];

  return (
    <div>
      {/* Conditionally render the TicketDetailsForm */}
      {showForm && selectedTicket ? (
        <TicketDetailsForm
          formData={selectedTicket}
          handleInputChange={(e) => setSelectedTicket({ ...selectedTicket, [e.target.name]: e.target.value })}
          handleFormCancel={handleFormCancel}
          refreshTickets={fetchTickets}
        />
      ) : (
        <>
          <div className="table">
            <table className="ticketing-table">
              <thead className="table-header">
                <tr>
                  {allColumns.map((col, index) => (
                    <th key={index} className="table-heading">{col}</th>
                  ))}
                  <th className="table-heading">Action</th> {/* New Action Column */}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row) => (
                  <tr key={row.TicketId}>
                    {allColumns.map((col, colIndex) => (
                      <td key={colIndex} data-column={col}>
                        {row[col]}
                      </td>
                    ))}
                    <td>
                      <button
                        onClick={() => handleUpdateClick(row)}
                        className="action-button"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
}

export default PendingTickets;
