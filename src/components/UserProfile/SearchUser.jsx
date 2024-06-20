import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { following } from "../../Store/LoggedUser";
import { followUser } from "../../Store/Userslice"; // Assuming UserSlice is correctly imported

function SearchUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const users = useSelector((state) => state.userData.items || []); // Ensure default to empty array if undefined
  const loggedUserData = useSelector((state) => state.LoggedUser.items[0]);
  const dispatch = useDispatch();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFollow = (id) => {
    dispatch(following({ userId: id }));
    if (loggedUserData) {
      console.log("hii", id, "----", loggedUserData.id);
      dispatch(followUser({ userId: loggedUserData.id, id }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-md shadow-md p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <span className="text-gray-800">{user.name}</span>
              <button
                onClick={() => handleFollow(user.id)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                Follow
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
