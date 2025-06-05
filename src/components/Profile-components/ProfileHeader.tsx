import React from 'react';
import '@/styles/profile.css';

const ProfileHeader: React.FC = () => (
  <div className="text-center mb-10">
    <h1 className="text-3xl font-bold text-creamLight font-third">My Profile</h1>
    <p className="profile-subtitle">Manage your account information</p>
  </div>
);

export default ProfileHeader;
