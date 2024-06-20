import React from "react";
import PropTypes from "prop-types";

function NotificationCard({ username, content }) {
  return (
    <div className="  dark:bg-gray-900  rounded-lg shadow-md p-6 mb-4 mx-4">
      <div className="flex items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">user</h3>
          <p className="text-sm text-white">1 min ago</p>
        </div>
      </div>
      <p className="text-white mt-4">Liked your post </p>
    </div>
  );
}

export default NotificationCard;
