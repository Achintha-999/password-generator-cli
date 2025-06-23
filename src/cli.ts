#!/usr/bin/env node
import chalk from 'chalk';
import clipboardy from 'clipboardy';
import { generatePassword, estimatePasswordStrength } from './passwordGenerator';

const args = process.argv.slice(2);
const length = args[0] ? parseInt(args[0]) : 16;

if (isNaN(length) {
  console.error(chalk.red('Error: Password length must be a number!'));
  process.exit(1);
}

const password = generatePassword({
  length,
  uppercase: true,
  numbers: true,
  symbols: true,
});

clipboardy.writeSync(password); // Copy to clipboard

console.log(chalk.green('Generated Password:'), chalk.bold(password));
console.log(chalk.blue('Password Strength:'), chalk.bold(estimatePasswordStrength(password)));
console.log(chalk.yellow('Password copied to clipboard!'));