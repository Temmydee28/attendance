// Client-side code using React and axios
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserListComponent = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // Make a GET request to the server endpoint
    axios.get('http://localhost:8001/users')
      .then(response => {
        // Handle the received data
        setUsers(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      <h2>List of Users:</h2>
      {users ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <strong>{user.username}</strong> - {user.email} - {user.role}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserListComponent;
