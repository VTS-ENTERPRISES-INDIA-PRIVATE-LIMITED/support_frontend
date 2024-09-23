import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "../App.css";

function AllTickets() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Number of items per page

  // Fetch tickets from backend
  const fetchTickets = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/ticket/getAllTickets`)
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

  // Columns to display
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

  // Function to get display text for AssignedStatus
  const getAssignedStatusText = (status) => {
    switch (status) {
      case '0':
        return "Not Assigned";
      case '1':
        return "Assigned";
      case '2':
        return "Completed";
    
    }
  };

  // Function to get display text for Status
  const getStatusText = (status) => {
    switch (status) {
      case '0':
        return "Open";
      case '1':
        return "Pending";
      case '2':
        return "Closed";
      
    }
  };

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
                {allColumns.map((col, colIndex) => (
                  <td key={colIndex} data-column={col}>
                    {col === "AssignedStatus"
                      ? getAssignedStatusText(row.AssignedStatus) // Custom display for AssignedStatus
                      : col === "Status"
                      ? getStatusText(row.Status) // Custom display for Status
                      : row[col]} {/* Default display for other columns */}
                  </td>
                ))}
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

export default AllTickets;
