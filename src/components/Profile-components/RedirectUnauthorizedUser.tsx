import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/data/routes';
import { getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import type { SessionUser } from '@/data/interfaces';
import React from 'react';
import InfoPopup from '@/components/Popup-components/InfoPopup';

const RedirectUnauthorizedUser: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const user: SessionUser | null = getLoggedInUserFromSessionStorage();

    if (!user) {
      setShowPopup(true);

      const timer = setTimeout(() => {
        navigate(ROUTES.login);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  if (!showPopup) return null;

  return <InfoPopup message="You must log in to access your profile." autoDismissMs={1000} />;
};

export default RedirectUnauthorizedUser;
