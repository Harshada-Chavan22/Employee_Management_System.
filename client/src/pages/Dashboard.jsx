import React, { useState } from "react";
import MainSection from "../components/MainSection/MainSection";
import LeftBar from "../components/LeftBar";

const Dashboard = () => {
  const [employeeId, setEmployeeId] = useState("");

  return (
  <div className="flex min-h-screen bg-gray-100">
    <LeftBar employeeId={employeeId} />

    <div className="flex-1">
      <MainSection setEmployeeId={setEmployeeId} />
    </div>
  </div>
);
};

export default Dashboard;