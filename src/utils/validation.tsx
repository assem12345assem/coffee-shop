export function validateEmail(email: string): string | null {
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email !== trimmedEmail) {
    return 'Email must not contain leading or trailing spaces.';
  }
  if (!emailRegex.test(trimmedEmail)) {
    return 'Please enter a valid email address (e.g., user@example.com).';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  const trimmedPassword = password.trim();
  if (password !== trimmedPassword) {
    return 'Password must not contain leading or trailing spaces.';
  }
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

  if (trimmedCountry === 'United States') {
    const usPostalRegex = /^\d{5}$/;
    if (!usPostalRegex.test(trimmedPostal)) {
      return 'Postal code must be 5 digits (e.g., 12345) for United States.';
    }
  } else if (trimmedCountry === 'Canada') {
    const canadaPostalRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    if (!canadaPostalRegex.test(trimmedPostal)) {
      return 'Postal code must match A1B 2C3 format for Canada.';
    }
  } else {
    const genericPostalRegex = /^[A-Za-z0-9\s-]{3,10}$/;

    if (!genericPostalRegex.test(trimmedPostal)) {
      return 'Invalid postal code format.';
    }
  }

  return null;
}

export function validateCountry(country: string): string | null {
  const trimmedCountry = country.trim();
  const allowedCountries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Georgia',
    'Uzbekistan',
    'Kyrgyzstan',
  ];

  if (!trimmedCountry) {
    return 'Country cannot be empty.';
  }

  if (!allowedCountries.includes(trimmedCountry)) {
    return 'Please select a valid country.';
  }

  return null;
}
