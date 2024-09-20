import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import '../App.css';

function Dashboard() {
  const [ticketsRaised, setTicketsRaised] = useState(0);
  const [ticketsPending, setTicketsPending] = useState(0);
  const [ticketsResolved, setTicketsResolved] = useState(0);
  const [feedbackData, setFeedbackData] = useState({ likelyToContinue: 0, likelyNotToContinue: 0 });
  const [assignedStatusData, setAssignedStatusData] = useState([]);
  const [statusFeedbackData, setStatusFeedbackData] = useState([]);

  // Data for feedback (likelihood to continue) for Pie Chart
  const pieDataFeedback = [
    {
      name: "Likely to Continue",
      value: feedbackData.likelyToContinue,
    },
    {
      name: "Likely Not to Continue",
      value: feedbackData.likelyNotToContinue,
    },
  ];

  // Move statusLabelMap outside so it can be accessed globally
  const statusLabelMap = {
    '0': 'Open',
    '1': 'Pending',
    '2': 'Closed',
  };

  // Moved the formatStatusLabel function outside
  const formatStatusLabel = (status) => statusLabelMap[status] || status;

  // Fetch ticket statistics from backend APIs
  useEffect(() => {
    const fetchTicketsStats = async () => {
      try {
        const [totalRes, pendingRes, feedbackRes, resolvedRes, assignedStatusRes] = await Promise.all([
          fetch("http://localhost:5000/ticket/getTicketCount"),
          fetch("http://localhost:5000/ticket/getPendingTicketsCount"),
          fetch("http://localhost:5000/ticket/getfeedback"),
          fetch("http://localhost:5000/ticket/getResolvedTicketsCount"),
          fetch("http://localhost:5000/ticket/getassigneestatus"),
        ]);
        const totalData = await totalRes.json();
        const feedbackData = await feedbackRes.json();
        const pendingData = await pendingRes.json();
        const resolvedData = await resolvedRes.json();
        const assignedStatus = await assignedStatusRes.json();

        setTicketsRaised(totalData[0]?.count || 0);
        setTicketsPending(pendingData[0]?.count || 0);
        setTicketsResolved(resolvedData[0]?.count || 0);

        setFeedbackData({
          likelyToContinue: Number(feedbackData[0]["Likely to Continue"]),
          likelyNotToContinue: Number(feedbackData[0]["Likely Not to Continue"]),
        });

        // Prepare data for the Assigned Status bar chart
        const transformedAssignedStatus = [
          { Status: "Completed", Count: assignedStatus.find((status) => status.Status === "Completed")?.status_count || 0 },
          { Status: "Assigned", Count: assignedStatus.find((status) => status.Status === "Assigned")?.status_count || 0 },
          { Status: "Not Assigned", Count: assignedStatus.find((status) => status.Status === "Not Assigned")?.status_count || 0 },
        ];

        setAssignedStatusData(transformedAssignedStatus);
      } catch (error) {
        console.error("Error fetching ticket statistics:", error);
      }
    };

    fetchTicketsStats();
  }, []);

  // Fetch Status vs Feedback Data
  useEffect(() => {
    const fetchStatusFeedback = async () => {
      try {
        const res = await fetch("http://localhost:5000/ticket/getfeedbackbystatus");
        const data = await res.json();
        setStatusFeedbackData(data);
      } catch (error) {
        console.error("Error fetching status feedback data:", error);
      }
    };

    fetchStatusFeedback();
  }, []);

  // Define colors for the bar chart
  const COLORS = ["#4CAF50", "#8884d8", "#ff6961"];

  return (
    <div className="dashboard">
      {/* Ticket Stats Cards */}
      <div className="stats-card">
        <div className="heading">Number of Tickets </div>
        <br />
        <div className="stats-card-count">{ticketsRaised}</div>
      </div>
      <div className="stats-card">
        <div className="heading">Number of Tickets Pending</div>
        <br />
        <div className="stats-card-count">{ticketsPending}</div>
      </div>
      <div className="stats-card">
        <div className="heading">Number of Tickets Resolved</div>
        <br />
        <div className="stats-card-count">{ticketsResolved}</div>
      </div>

      <div className="chart-content">
        {/* Pie Chart: Customer Feedback */}
        <div className="chart-card center-chart">
          <div className="heading">Customer Feedback</div>
          <div className="chart">
            <PieChart width={280} height={300}>
              <Pie
                data={pieDataFeedback}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieDataFeedback.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === "Likely to Continue" ? "#4CAF50" : "#ff6961"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Bar Chart: Assigned Status */}
        <div className="chart-card center-chart">
          <div className="heading">Assigned Status Overview</div>
          <div className="chart">
            <BarChart
              width={300}
              height={300}
              data={assignedStatusData}
              layout="vertical"
              margin={{
                top: 20,
                right: 30,
                bottom: 5,
                left: 20,
              }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="Status" />
              <Tooltip />
              <Legend wrapperStyle={{ display: 'none' }} />
              <Bar dataKey="Count" barSize={40}>
                {assignedStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.Status === "Completed"
                        ? "#4CAF50"
                        : entry.Status === "Assigned"
                        ? "#8884d8"
                        : "#ff6961"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>

        {/* Bar Chart for Status vs Feedback */}
        <div className="chart-card center-chart">
          <div className="heading">Status vs Customer Feedback</div>
          <div className="chart">
            <BarChart
              width={300}
              height={300}
              data={statusFeedbackData}
              margin={{
                top: 20,
                right: 30,
                bottom: 5,
              }}
            >
              <XAxis dataKey="Status" tickFormatter={formatStatusLabel} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="NotLikelyToContinue" fill="#ff6961" />
              <Bar dataKey="LikelyToContinue" fill="#4CAF50" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
