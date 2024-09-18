import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "../App.css";
import { toast } from "react-toastify";

function OpenTickets() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Number of items per page

  const fetchTickets = () => {
    axios
      .get("http://localhost:5000/ticket/getOpenTickets")
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

  // Calculate page items
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  // Total pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePickUpTicket = (ticketId) => {
    axios
      .put(`http://localhost:5000/ticket/updateassignedstatus/${ticketId}`)
      .then((response) => {
        toast.success("The ticket has been assigned to you. Please solve it and update the status in the pending list.");
        fetchTickets(); // Re-fetch the tickets to update the UI
      })
      .catch((error) => {
        console.error("Error picking up the ticket:", error);
        toast.error("Error assigning the ticket. Please try again.");
      });
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
    "Action" // Add Action column here
  ];

  return (
    <div>
      <div className="table">
        <table className="ticketing-table">
          <thead className="table-header">
            <tr>
              {allColumns.map((col, index) => (
                <th key={index} className="table-heading">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row) => (
              <tr key={row.TicketId}>
                {allColumns.slice(0, -1).map((col, colIndex) => (
                  <td key={colIndex} data-column={col}>
                    {row[col]}
                  </td>
                ))}
                <td>
                  <button 
                    className="pick-up-button" 
                    onClick={() => handlePickUpTicket(row.TicketId)}
                  >
                    Pick Up
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
    </div>
  );
}

export default OpenTickets;
