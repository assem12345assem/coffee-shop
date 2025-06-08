import { allowedCountries } from '@/data/constants';

export function validateEmail(email: string): string | null {
  const hasLeadingOrTrailingWhitespace = email !== email.trim();
  if (hasLeadingOrTrailingWhitespace) {
    return 'Email must not contain leading or trailing spaces.';
  }

  const trimmedEmail = email.trim();
  if (trimmedEmail === '') {
    return 'Email cannot be empty.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return 'Please enter a valid email address (e.g., user@example.com).';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (password !== password.trim()) {
    return 'Password must not contain leading or trailing spaces.';
  }

  const trimmedPassword = password.trim();

  if (trimmedPassword.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (!/[A-Z]/.test(trimmedPassword)) {
    return 'Password must contain at least one uppercase letter (A-Z).';
  }
  if (!/[a-z]/.test(trimmedPassword)) {
    return 'Password must contain at least one lowercase letter (a-z).';
  }
  if (!/[0-9]/.test(trimmedPassword)) {
    return 'Password must contain at least one digit (0-9).';
  }
  if (!/[!@#$%^&*]/.test(trimmedPassword)) {
    return 'Password must contain at least one special character (!@#$%^&*).';
  }

  return null;
}

export function validateName(name: string): string | null {
  return /^[A-Za-z]+$/.test(name.trim()) ? null : 'Only letters are allowed.';
}

export function validateDOB(dob: string): string | null {
  const date = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();

  if (isNaN(date.getTime())) return 'Invalid date format.';
  if (age < 13 || (age === 13 && today < new Date(date.getFullYear() + 13, date.getMonth(), date.getDate()))) {
    return 'You must be at least 13 years old.';
  }
  return null;
}

export function validateStreet(street: string): string | null {
  return street.trim().length > 0 ? null : 'Street cannot be empty.';
}

export function validateCity(city: string): string | null {
  return /^[A-Za-z\s]+$/.test(city.trim()) ? null : 'City must only contain letters.';
}

export function validatePostalCode(postalCode: string, country: string): string | null {
  const trimmedPostal = postalCode.trim();
  const trimmedCountry = country.trim();

  if (!trimmedPostal) {
    return 'Postal code cannot be empty.';
  }

  const postalCodeFormats: Record<string, { regex: RegExp; message: string }> = {
    'United States': {
      regex: /^\d{5}$/,
      message: 'Postal code must be 5 digits (e.g., 12345) for the United States.',
    },
    Canada: {
      regex: /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
      message: 'Postal code must match the Canadian format (e.g., A1B 2C3).',
    },
    Uzbekistan: {
      regex: /^\d{6}$/,
      message: 'Postal code must be 6 digits (e.g., 100000) for Uzbekistan.',
    },
    Georgia: {
      regex: /^\d{4}$/,
      message: 'Postal code must be 4 digits (e.g., 0105) for Georgia.',
    },
    Kyrgyzstan: {
      regex: /^\d{6}$/,
      message: 'Postal code must be 6 digits (e.g., 720001) for Kyrgyzstan.',
    },
    'United Kingdom': {
      regex: /^[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2}$/,
      message: 'Postal code must match the UK format (e.g., SW1A 1AA).',
    },
    Australia: {
      regex: /^\d{4}$/,
      message: 'Postal code must be 4 digits (e.g., 2000) for Australia.',
    },
  };

  if (postalCodeFormats[trimmedCountry]) {
    const { regex, message } = postalCodeFormats[trimmedCountry];
    if (!regex.test(trimmedPostal)) {
      return message;
    }
  } else {
    const genericPostalRegex = /^[A-Za-z0-9\s-]{3,10}$/;
    if (!genericPostalRegex.test(trimmedPostal)) {
      return 'Postal code must be 3–10 characters and may include letters, digits, spaces, or hyphens.';
    }
  }

  return null;
}

export function validateCountry(country: string): string | null {
  const trimmedCountry = country.trim();

  if (!trimmedCountry || trimmedCountry === 'Country') {
    return 'Country cannot be empty.';
  }

  if (!allowedCountries.includes(trimmedCountry)) {
    return 'Please select a valid country from the list.';
  }

  return null;
}
