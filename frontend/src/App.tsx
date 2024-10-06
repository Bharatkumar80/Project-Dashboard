import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home, User, Settings as SettingsIcon, Calendar, FileText } from 'lucide-react';
import { UserProvider, User1 } from './contexts/userContext';
import Dashboard from './components/Dashboard';
import Profile from './components/profile';
import Settings from './components/setting';
import Notes from './components/notes';
import MyCalendar from './components/Calendar';
import UserInitials from './components/userIntial';
import { fetchUserData } from './Services/api';

const App: React.FC = () => {
  const [user, setUser] = useState<User1 | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    loadUserData();
  }, []);

  return (
    <UserProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r">
            <div className="p-4 flex items-center">
              <h1 className="text-2xl font-bold text-purple-600 mr-2">ProductivityApp</h1>
              {user && <UserInitials name={user.name} />}
            </div>
            <nav className="mt-8">
              <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-100">
                <Home className="w-5 h-5 mr-2" />
                Home
              </Link>
              <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-100">
                <User className="w-5 h-5 mr-2" />
                Profile
              </Link>
              <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-100">
                <SettingsIcon className="w-5 h-5 mr-2" />
                Settings
              </Link>
              <Link to="/notes" className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-100">
                <FileText className="w-5 h-5 mr-2" />
                Notes
              </Link>
              <Link to="/calendar" className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-100">
                <Calendar className="w-5 h-5 mr-2" />
                Calendar
              </Link>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/calendar" element={<MyCalendar />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;