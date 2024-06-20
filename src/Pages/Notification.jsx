import React from "react";
import Navbar from "../components/layouts/Navbar";
import NotificationCard from "../components/Notification/NotificationCard";

function Notification() {
  return (
    <div>
      <Navbar />

      <div className="mt-20">
        <NotificationCard />
      </div>
    </div>
  );
}

export default Notification;
