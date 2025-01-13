import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const usersDatabase = [
    { id: 1, username: 'AliceBrown', email: 'alice@example.com', password: 'password101', status: 'active', previousLogins: ['2025-01-02 10:00:00'] },
    { id: 2, username: 'ChrisEvans', email: 'chris@example.com', password: 'password123', status: 'active', previousLogins: ['2025-01-01 09:00:00', '2025-01-02 11:00:00'] },
  { id: 3, username: 'SophiaWilliams', email: 'sophia@example.com', password: 'mypassword', status: 'blocked', previousLogins: ['2025-01-03 12:00:00'] },
  { id: 4, username: 'DavidJohnson', email: 'david@example.com', password: 'securepass', status: 'active', previousLogins: ['2025-01-02 15:00:00', '2025-01-03 16:30:00'] },
  { id: 5, username: 'EmilyClark', email: 'emily@example.com', password: 'emilypass', status: 'active', previousLogins: ['2025-01-03 10:00:00'] },
  { id: 6, username: 'OliverJones', email: 'oliver@example.com', password: 'oliverpass', status: 'blocked', previousLogins: ['2025-01-01 13:00:00'] },
  { id: 7, username: 'EmmaTaylor', email: 'emma@example.com', password: 'emmataylor1', status: 'active', previousLogins: ['2025-01-02 18:00:00'] },
  { id: 8, username: 'LiamWilson', email: 'liam@example.com', password: 'liampass456', status: 'blocked', previousLogins: ['2025-01-02 07:00:00'] },
  { id: 9, username: 'AvaDavis', email: 'ava@example.com', password: 'avadavis321', status: 'active', previousLogins: ['2025-01-03 09:30:00'] },
  { id: 10, username: 'LucasBrown', email: 'lucas@example.com', password: 'lucas123', status: 'active', previousLogins: ['2025-01-01 12:45:00'] },
  { id: 11, username: 'MiaMoore', email: 'mia@example.com', password: 'mia789', status: 'blocked', previousLogins: ['2025-01-03 14:15:00'] },
  { id: 12, username: 'NoahAnderson', email: 'noah@example.com', password: 'noahpass', status: 'active', previousLogins: ['2025-01-01 17:30:00', '2025-01-02 19:00:00'] },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(usersDatabase);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
  
    if (loggedInUser) {
      setUsers((prevUsers) => {
        const userExists = prevUsers.some((user) => user.email === loggedInUser.email);
        return userExists ? prevUsers : [...prevUsers, { ...loggedInUser, id: prevUsers.length + 1 }];
      });
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAction = (action, userId) => {
    switch (action) {
      case 'block':
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, status: 'blocked' } : user
          )
        );
        break;
      case 'unblock':
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, status: 'active' } : user
          )
        );
        break;
      case 'remove':
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        break;
      case 'update':
        const userToUpdate = users.find(user => user.id === userId);
        if (userToUpdate) {
          const newEmail = prompt('Enter new email for ' + userToUpdate.username);
          if (newEmail) {
            setUsers(prevUsers =>
              prevUsers.map(user =>
                user.id === userId ? { ...user, email: newEmail } : user
              )
            );
          }
        }
        break;
      case 'add':
        const newUsername = prompt('Enter new username');
        const newUserEmail = prompt('Enter new email');
        const newPassword = prompt('Enter password');
        if (newUsername && newUserEmail && newPassword) {
          const newUser = {
            id: users.length + 1,
            username: newUsername,
            email: newUserEmail,
            password: newPassword,
            status: 'active',
            previousLogins: [],
          };
          setUsers(prevUsers => [...prevUsers, newUser]);
        }
        break;
      case 'previousLogins':
        const user = users.find(user => user.id === userId);
        if (user) {
          const loginHistory = user.previousLogins.length
            ? user.previousLogins.join(', ')
            : 'No previous logins';
          alert(`Previous logins for ${user.username}: ${loginHistory}`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container container py-4">
      <div className="row">
        <div className="col-9 d-flex align-items-center">
          <h1 className="text-primary">Dashboard</h1>
        </div>

        <div className="col-3 d-flex justify-content-end align-items-center">
          <div className="logout-button">
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="col-3 d-flex justify-content-end">
        <div className="add-user">
          <button onClick={() => handleAction('add')} className="btn btn-primary">
            Add User
          </button>
        </div>
      </div>

      {error && <div className="error-message text-danger">{error}</div>}

      <table className="user-list table table-bordered table-striped mt-3">
        <thead>
          <tr className="table-primary">
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={user.status === 'blocked' ? 'table-danger' : ''}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                {user.status === 'active' ? (
                  <button
                    onClick={() => handleAction('block', user.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction('unblock', user.id)}
                    className="btn btn-success btn-sm"
                  >
                    Unblock
                  </button>
                )}
                <button
                  onClick={() => handleAction('previousLogins', user.id)}
                  className="btn btn-warning btn-sm mx-2"
                >
                  Previous Logins
                </button>
                <button
                  onClick={() => handleAction('update', user.id)}
                  className="btn btn-info btn-sm mx-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleAction('remove', user.id)}
                  className="btn btn-dark btn-sm mx-2"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
