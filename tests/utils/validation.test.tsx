import {
  validateEmail,
  validatePassword,
  validateName,
  validateDOB,
  validateStreet,
  validateCity,
  validatePostalCode,
  validateCountry,
} from '@/utils/validation';

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    it('should return null for a valid email', () => {
      expect(validateEmail('user@example.com')).toBeNull();
    });

    it('should return an error for leading/trailing spaces', () => {
      expect(validateEmail(' user@example.com ')).toBe('Email must not contain leading or trailing spaces.');
    });

    it('should return an error for missing @ symbol', () => {
      expect(validateEmail('userexample.com')).toBe('Please enter a valid email address (e.g., user@example.com).');
    });

    it('should return an error for missing domain', () => {
      expect(validateEmail('user@')).toBe('Please enter a valid email address (e.g., user@example.com).');
    });
  });

  describe('validatePassword', () => {
    it('should return null for a strong valid password', () => {
      expect(validatePassword('StrongP@ss1')).toBeNull();
    });

    it('should return an error for a password shorter than 8 chars', () => {
      expect(validatePassword('Pass1!')).toBe('Password must be at least 8 characters long.');
    });

    it('should return an error for missing uppercase letter', () => {
      expect(validatePassword('password1!')).toBe('Password must contain at least one uppercase letter (A-Z).');
    });

    it('should return an error for missing lowercase letter', () => {
      expect(validatePassword('PASSWORD1!')).toBe('Password must contain at least one lowercase letter (a-z).');
    });

    it('should return an error for missing number', () => {
      expect(validatePassword('Password!')).toBe('Password must contain at least one digit (0-9).');
    });

    it('should return an error for missing special character', () => {
      expect(validatePassword('Password1')).toBe('Password must contain at least one special character (!@#$%^&*).');
    });

    it('should return an error for leading/trailing spaces', () => {
      expect(validatePassword(' Password1! ')).toBe('Password must not contain leading or trailing spaces.');
    });
  });

  describe('validateName', () => {
    it('should return null for a valid name', () => {
      expect(validateName('John')).toBeNull();
    });

    it('should return an error for a name containing numbers', () => {
      expect(validateName('John123')).toBe('Only letters are allowed.');
    });

    it('should return an error for a name with special characters', () => {
      expect(validateName('John@Doe')).toBe('Only letters are allowed.');
    });
  });

  describe('validateDOB', () => {
    it('should return null for a valid date', () => {
      expect(validateDOB('2000-01-01')).toBeNull();
    });

    it('should return an error for an invalid date format', () => {
      expect(validateDOB('invalid-date')).toBe('Invalid date format.');
    });

    it('should return an error if user is under 13', () => {
      expect(validateDOB('2015-01-01')).toBe('You must be at least 13 years old.');
    });
  });

  // Street validation tests
  describe('validateStreet', () => {
    it('should return null for a valid street', () => {
      expect(validateStreet('123 Main St')).toBeNull();
    });

    it('should return an error for an empty street', () => {
      expect(validateStreet('')).toBe('Street cannot be empty.');
    });
  });

  describe('validateCity', () => {
    it('should return null for a valid city', () => {
      expect(validateCity('New York')).toBeNull();
    });

    it('should return an error for a city with numbers', () => {
      expect(validateCity('New York 123')).toBe('City must only contain letters.');
    });
  });

  describe('validatePostalCode', () => {
    it('should return null for a valid US postal code', () => {
      expect(validatePostalCode('12345', 'United States')).toBeNull();
    });

    it('should return an error for an invalid US postal code', () => {
      expect(validatePostalCode('abcde', 'United States')).toBe(
        'Postal code must be 5 digits (e.g., 12345) for United States.'
      );
    });

    it('should return null for a valid Canadian postal code', () => {
      expect(validatePostalCode('A1B 2C3', 'Canada')).toBeNull();
    });

    it('should return an error for an invalid Canadian postal code', () => {
      expect(validatePostalCode('123456', 'Canada')).toBe('Postal code must match A1B 2C3 format for Canada.');
    });

    it('should return null for a valid generic postal code', () => {
      expect(validatePostalCode('1234-567', 'United Kingdom')).toBeNull();
    });

    it('should return an error for an empty postal code', () => {
      expect(validatePostalCode('', 'Canada')).toBe('Postal code cannot be empty.');
    });
  });

  describe('validateCountry', () => {
    it('should return null for a valid country', () => {
      expect(validateCountry('Canada')).toBeNull();
    });

    it('should return an error for an unsupported country', () => {
      expect(validateCountry('Germany')).toBe('Please select a valid country.');
    });

    it('should return an error for an empty country input', () => {
      expect(validateCountry('')).toBe('Country cannot be empty.');
    });
  });
});
