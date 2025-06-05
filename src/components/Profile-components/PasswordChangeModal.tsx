import React, { useState, useRef, useEffect } from 'react';
import { showToast } from '@/utils/profileUtils';
import PasswordInput from '@/components/Login-registration-components/PasswordInput';
import type { InputHandle } from '@/data/interfaces';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const PasswordChangeModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onChangePassword }) => {
  const currentPasswordRef = useRef<InputHandle>(null);
  const newPasswordRef = useRef<InputHandle>(null);
  const confirmPasswordRef = useRef<InputHandle>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const handleSubmit = async () => {
    const currentPassword = currentPasswordRef.current?.getValue() || '';
    const newPassword = newPasswordRef.current?.getValue() || '';
    const confirmPassword = confirmPasswordRef.current?.getValue() || '';

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    await onChangePassword(currentPassword, newPassword);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-coffeeBrown p-6 rounded-lg w-96 flex flex-col gap-2">
        <h2 className="text-xl font-semibold my-4">Change Password</h2>

        <PasswordInput
          ref={currentPasswordRef}
          placeholder="Current Password"
          showForgotPassword={false}
          label="Current Password"
        />
        <PasswordInput
          ref={newPasswordRef}
          placeholder="New Password"
          showForgotPassword={false}
          label="New Password"
        />
        <PasswordInput
          ref={confirmPasswordRef}
          placeholder="Confirm New Password"
          showForgotPassword={false}
          label="Confirm New Password"
        />

        <button
          onClick={handleSubmit}
          className="bg-[#6f4e37] text-white p-2 rounded w-full mt-2 transition-transform duration-200 hover:scale-105"
        >
          Submit
        </button>
        <button onClick={onClose} className="text-gray-50 mt-2 transition-transform duration-200 hover:scale-105">
          Cancel
        </button>
      </div>
    </div>
  );
};
