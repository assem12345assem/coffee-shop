import React, { type ReactElement } from 'react';
import BackButton from '@/components/Login-registration-components/BackButton';
import LoginFormComponent from '@/components/Login-registration-components/LoginFormComponent';
import UserRedirect from '@/utils/useRedirect';

const LoginPage: React.FC = (): ReactElement => {
  return (
    <div className="min-h-screen bg-[#f0e6d7] px-4 py-8">
      <UserRedirect />
      <div className="w-full max-w-7xl mx-auto mb-6">
        <BackButton />
      </div>
      <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="w-full max-w-xl bg-[#e6d7c2] rounded-2xl shadow-xl p-8">
          <h1 className="font-semibold text-4xl mb-8 text-center">Login to your account</h1>
          <div className="w-full max-w-md mx-auto">
            <LoginFormComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
