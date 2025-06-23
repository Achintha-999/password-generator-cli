import crypto from 'crypto';

type PasswordOptions = {
  length?: number;
  uppercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
};

export function generatePassword(options: PasswordOptions = {}): string {
  const {
    length = 16,
    uppercase = true,
    numbers = true,
    symbols = true,
  } = options;

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
  const numberChars = numbers ? '0123456789' : '';
  const symbolChars = symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '';

  const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars;
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

export function estimatePasswordStrength(password: string): string {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);
  const length = password.length;

  let strength = 0;
  if (hasLowercase) strength += 1;
  if (hasUppercase) strength += 1;
  if (hasNumbers) strength += 1;
  if (hasSymbols) strength += 1;
  if (length >= 12) strength += 2;
  else if (length >= 8) strength += 1;

  if (strength <= 2) return "Weak";
  if (strength <= 4) return "Medium";
  if (strength <= 6) return "Strong";
  return "Very Strong";
}