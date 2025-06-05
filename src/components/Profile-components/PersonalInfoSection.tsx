import React from 'react';
import Input from '@/components/Login-registration-components/Input';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import type { PersonalInfoProps } from '@/data/interfaces';

const PersonalInfoSection: React.FC<PersonalInfoProps> = ({
  customerInputRefs,
  customer,
  handleInputChange,
  validationFunctions,
  isEditing,
}) => (
  <div className="mb-8">
    <h2 className="section-title">Personal Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {['firstName', 'lastName', 'dateOfBirth', 'email'].map((name) => (
        <Input
          ref={(el) => {
            customerInputRefs.current[name] = el;
          }}
          key={name}
          label={name.replace(/^\w/, (c) => c.toUpperCase())}
          type={name === 'dateOfBirth' ? 'date' : 'text'}
          initialValue={
            name === 'dateOfBirth'
              ? customer.dateOfBirth
                ? new Date(customer.dateOfBirth).toISOString().split('T')[0]
                : ''
              : String(customer[name as keyof Customer] ?? '')
          }
          onChange={(val) => handleInputChange(name, val)}
          validate={validationFunctions[name]}
          readOnly={!isEditing}
        />
      ))}
    </div>
  </div>
);

export default PersonalInfoSection;
