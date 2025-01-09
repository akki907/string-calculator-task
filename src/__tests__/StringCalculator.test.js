import { StringCalculator } from '../StringCalculator.js';

describe('StringCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    // Basic functionality tests
    describe('basic functionality', () => {
        test('should return 0 for empty string', () => {
            expect(calculator.add('')).toBe(0);
        });

        test('should return the number for single number', () => {
            expect(calculator.add('1')).toBe(1);
        });

        test('should return sum for two numbers', () => {
            expect(calculator.add('1,5')).toBe(6);
        });

        test('should handle arbitrary amount of numbers', () => {
            expect(calculator.add('1,2,3,4')).toBe(10);
        });
    });

    // Delimiter tests
    describe('delimiters', () => {
        test('should handle new lines between numbers', () => {
            expect(calculator.add('1\n2,3')).toBe(6);
        });

        test('should support custom delimiters', () => {
            expect(calculator.add('//;\n1;2')).toBe(3);
        });

        test('should handle multiple consecutive delimiters', () => {
            expect(calculator.add('1,,,2')).toBe(3);
        });

        test('should handle leading and trailing delimiters', () => {
            expect(calculator.add(',1,2,')).toBe(3);
        });
    });

    // Error handling tests
    describe('error handling', () => {
        test('should throw error for non-string input', () => {
            expect(() => calculator.add(123))
                .toThrow('Input must be a string');
        });

        test('should throw error for single negative number', () => {
            expect(() => calculator.add('-1,2'))
                .toThrow('negative numbers not allowed: -1');
        });

        test('should throw error listing all negative numbers', () => {
            expect(() => calculator.add('2,-4,3,-5'))
                .toThrow('negative numbers not allowed: -4,-5');
        });

        test('should throw error for invalid number format', () => {
            expect(() => calculator.add('1,a,3'))
                .toThrow('Invalid number: a');
        });

        test('should throw error for invalid custom delimiter format', () => {
            expect(() => calculator.add('//;1;2'))
                .toThrow('Invalid custom delimiter format');
        });
    });

    // Configuration tests
    describe('configuration', () => {
        test('should track number of add() calls', () => {
            calculator.add('1,2');
            calculator.add('3,4');
            expect(calculator.getCalledCount()).toBe(2);
        });

        test('should ignore numbers greater than maxNumber when configured', () => {
            const calc = new StringCalculator({ maxNumber: 10, ignoreGreaterThan: true });
            expect(calc.add('5,15,3')).toBe(8);
        });

        test('should throw error for numbers greater than maxNumber when configured', () => {
            const calc = new StringCalculator({ maxNumber: 10, ignoreGreaterThan: false });
            expect(() => calc.add('5,15,3'))
                .toThrow('numbers cannot be greater than 10');
        });

        test('should handle floating point numbers when configured', () => {
            const calc = new StringCalculator({ allowFloats: true });
            expect(calc.add('1.5,2.7')).toBe(4.2);
        });
    });
});