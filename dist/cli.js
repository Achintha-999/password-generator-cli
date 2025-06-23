#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clipboardy_1 = __importDefault(require("clipboardy"));
const passwordGenerator_1 = require("./passwordGenerator");
const args = process.argv.slice(2);
const length = args[0] ? parseInt(args[0]) : 16;
if (isNaN(length)) {
    console.error(chalk_1.default.red('Error: Password length must be a number!'));
    process.exit(1);
}
const password = (0, passwordGenerator_1.generatePassword)({
    length,
    uppercase: true,
    numbers: true,
    symbols: true,
});
clipboardy_1.default.writeSync(password); // Copy to clipboard
console.log(chalk_1.default.green('Generated Password:'), chalk_1.default.bold(password));
console.log(chalk_1.default.blue('Password Strength:'), chalk_1.default.bold((0, passwordGenerator_1.estimatePasswordStrength)(password)));
console.log(chalk_1.default.yellow('Password copied to clipboard!'));
