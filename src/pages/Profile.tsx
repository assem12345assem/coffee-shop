import React from 'react';
import ProfileComponent from '@/components/Profile-components/ProfileComponent';
import RedirectUnauthorizedUser from '@/components/Profile-components/RedirectUnauthorizedUser';

function Profile() {
  return (
    <>
      <RedirectUnauthorizedUser />
      <ProfileComponent />
    </>
  );
}

export default Profile;
