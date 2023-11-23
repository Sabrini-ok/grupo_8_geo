// ChartUsers.js

import React, { useState, useEffect } from 'react';

function ChartUsers() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Admin</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Género</th>
                <th>Password</th>
                <th>Avatar</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userData.users) && userData.users.length > 0 ? (
                userData.users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.admin}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.password}</td>
                    <td>{user.avatar}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th>ID</th>
                <th>Admin</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Género</th>
                <th>Password</th>
                <th>Avatar</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ChartUsers;
