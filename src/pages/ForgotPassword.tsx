import React from 'react';
import ResetPassword from '@/components/Profile-components/ResetPassword';
import BackButton from '@/components/Login-registration-components/BackButton';

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#f0e6d7] px-4 py-8">
      <div className="w-full max-w-7xl mx-auto mb-6">
        <BackButton />
      </div>
      <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="w-full max-w-xl bg-[#e6d7c2] rounded-2xl shadow-xl p-8">
          <h1 className="font-semibold text-4xl mb-8 text-center">Reset My Password</h1>
          <div className="w-full max-w-md mx-auto">
            <ResetPassword />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
