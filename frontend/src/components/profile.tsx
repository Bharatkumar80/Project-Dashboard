import React, { useState, useContext, useRef, ChangeEvent } from 'react';
import { UserContext } from '../contexts/userContext';

interface UserData {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

const Profile: React.FC = () => {
  const { user, loading, updateUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    bio: '',
    avatarUrl: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        avatarUrl: user.avatarUrl,
      });
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user data</div>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <img
              src={userData.avatarUrl || '/image.jpg'}
              alt={`${userData.name}'s avatar`}
              style={{ width: '100px', height: '100px', cursor: 'pointer' }}
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <img
            src={user.avatarUrl || '/default-avatar.png'}
            alt={`${user.name}'s avatar`}
            style={{ width: '100px', height: '100px' }}
          />
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          {user.bio && <p>Bio: {user.bio}</p>}
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;