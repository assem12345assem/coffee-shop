export const customerId = 'customerId';
export const customerVersion = 'customerVersion';

export const FormElements = {
  email: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
  password: {},
  firstName: {
    label: 'First Name',
    placeholder: 'e.g. Jane',
  },
  lastName: {
    label: 'Last Name',
    placeholder: 'e.g. Doe',
  },
  dob: {
    label: 'Date of Birth',
    type: 'date',
  },
  street: {
    label: '',
    placeholder: 'Street',
  },
  city: {
    label: '',
    placeholder: 'City',
  },
  postalCode: {
    label: '',
    placeholder: 'Postal Code',
  },
  country: {
    label: '',
    placeholder: 'Country',
  },
  sameAddress: {
    label: 'Use same address for shipping',
  },
  shippingCountry: {
    placeholder: 'Shipping Country',
  },
  shippingPostalCode: {
    placeholder: 'Shipping postal code',
  },
  shippingCity: {
    placeholder: 'Shipping city',
  },
  shippingStreet: {
    placeholder: 'Shipping street',
  },
  shippingAddress: 'Shipping Address',
  billingAddress: 'Billing Address',
};

export const sameAddressCheckboxMessage = 'Check this if you want to use your billing address for shipping as well.';

export const AuthRedirect = {
  registerPage: {
    question: 'Already Have An Account?',
    label: 'Login',
  },
  loginPage: {
    question: "Don't have an account?",
    label: 'Sign Up',
  },
};
export const allowedCountries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Georgia',
  'Uzbekistan',
  'Kyrgyzstan',
];
