import React from "react";
import MissionList from "../components/dashboard";

export default function MissionsPage() {
  return (
    <div className="py-4">
      <h2 className="text-center mb-4">Mission List</h2>
      <MissionList />
    </div>
  );
}
