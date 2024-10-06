import React from 'react';

interface UserInitialsProps {
  name: string;
}

const UserInitials: React.FC<UserInitialsProps> = ({ name }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
      {initials}
    </div>
  );
};

export default UserInitials;