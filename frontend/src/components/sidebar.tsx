import React, { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

const Sidebar: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>ProductivityApp</h1>
      </div>
      {user && (
        <div className="user-info">
          <div className="profile-initial">{user.name[0].toUpperCase()}</div>
          <span className="username">{user.name}</span>
        </div>
      )}
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/notes">Notes</a></li>
          <li><a href="/calendar">Calendar</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;