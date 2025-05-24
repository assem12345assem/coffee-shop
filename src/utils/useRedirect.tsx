import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoPopup from '@/components/Popup-components/InfoPopup';
import { ROUTES } from '@/data/routes';
import React from 'react';
import { getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import type { SessionUser } from '@/data/interfaces';

const UserRedirect: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user: SessionUser | null = getLoggedInUserFromSessionStorage();
    if (user) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        navigate(ROUTES.main);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  if (!showPopup) return null;

  return <InfoPopup message="You are already logged in!" autoDismissMs={500} />;
};

export default UserRedirect;
