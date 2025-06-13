import { GridFrequencies } from '../types/numerology';

export const calculateGridFrequencies = (dateString: string): GridFrequencies => {
  const frequencies: GridFrequencies = {
    '1': 0, '2': 0, '3': 0, '4': 0, '5': 0,
    '6': 0, '7': 0, '8': 0, '9': 0
  };

  // Remove all non-digit characters and process each digit
  const digits = dateString.replace(/\D/g, '');
  
  for (const digit of digits) {
    if (digit !== '0' && frequencies.hasOwnProperty(digit)) {
      frequencies[digit]++;
    }
  }

  return frequencies;
};

export const calculateLifePath = (dateString: string): number => {
  // Sum all digits in the date
  const digits = dateString.replace(/\D/g, '');
  let sum = digits.split('').reduce((acc, digit) => acc + parseInt(digit), 0);

  // Reduce to single digit or Master Number (11, 22, 33)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return sum;
};
