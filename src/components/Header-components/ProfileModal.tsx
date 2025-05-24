import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '@/utils/customerUtils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/data/routes';

function ProfileModal() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate(ROUTES.main);
  };
  return (
    <div
      className=" w-[200px]  bg-brown p-6 flex flex-col items-center gap-4 rounded-xl shadow-lg animate-slideFade z-50"
      role="dialog"
    >
      <Link to="/profile" className="text-americanSilver hover:text-white transition-colors duration-200">
        Profile
      </Link>
      <button onClick={handleLogout} className="text-americanSilver hover:text-white transition-colors duration-200">
        Log Out
      </button>
    </div>
  );
}

export default ProfileModal;
