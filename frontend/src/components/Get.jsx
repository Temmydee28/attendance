import { useState, useEffect } from "react";
import axios from "axios";

const Get = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8001/users', {
          headers: {
            Authorization: token,
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };
    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {userData.username ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>MatricNumber: {userData.matricNumber}</p>
          <p>Level: {userData.level}</p>
          <p>Department: {userData.department}</p>
          <p>College: {userData.college}</p>
          <p>Fullname: {userData.fullname}</p>

          {/* Add more properties here based on what your server returns */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Get;
