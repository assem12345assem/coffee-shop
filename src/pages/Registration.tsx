import React from 'react';
import BackButton from '@/components/Login-registration-components/BackButton';
import RegistrationFormComponent from '@/components/Login-registration-components/RegistrationFormComponent';
import UserRedirect from '@/utils/useRedirect';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f0e6d7] px-4 py-12">
      <UserRedirect />
      <div className="w-full max-w-7xl mx-auto mb-6">
        <BackButton />
      </div>

      <div className="w-full max-w-3xl mx-auto bg-[#e6d7c2] rounded-2xl shadow-xl p-8">
        <h1 className="font-semibold text-4xl mb-8 text-center">Create an account</h1>
        <RegistrationFormComponent />
      </div>
    </div>
  );
};

export default Register;
