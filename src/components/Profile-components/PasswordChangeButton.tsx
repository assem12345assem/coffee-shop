import { useState } from 'react';
import Button from '@/components/Login-registration-components/Button';
import { PasswordChangeModal } from '@/components/Profile-components/PasswordChangeModal';
import { getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import type { SessionUser } from '@/data/interfaces';
import { changeCustomerPassword } from '@/api/profile/update';
import type { CustomerChangePassword } from '@commercetools/platform-sdk';
import { showToast } from '@/utils/profileUtils';
import React from 'react';
import handleApiError from '@/utils/handleApiError';
import { getCustomerById } from '@/api/customers';

export const PasswordChangeButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const sessionUser: SessionUser | null = getLoggedInUserFromSessionStorage();
      if (!sessionUser) {
        throw new Error('Not logged in');
      }
      const customerData = await getCustomerById(sessionUser.customerId);
      if (!customerData) throw new Error('Customer does not exist');

      const customerChangePassword: CustomerChangePassword = {
        id: sessionUser.customerId,
        version: customerData.version,
        currentPassword,
        newPassword,
      };
      await changeCustomerPassword(customerChangePassword);
      showToast('Password successfully changed!', 'success');
    } catch (error) {
      console.error(error);
      showToast(handleApiError(error), 'error');
    }
  };

  return (
    <div>
      <Button
        label="Change Password"
        className="bg-lime-900 transition-transform duration-200 hover:scale-105"
        onClick={() => setModalOpen(true)}
      />
      <PasswordChangeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onChangePassword={changePassword} />
    </div>
  );
};
