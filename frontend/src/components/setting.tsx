import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Dark Mode
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Email Notifications
          </label>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded">Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;