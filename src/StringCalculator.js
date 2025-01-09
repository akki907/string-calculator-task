export class StringCalculator {
    constructor(options = {}) {
        this.maxNumber = options.maxNumber || 1000;
        this.ignoreGreaterThan = options.ignoreGreaterThan ?? true;
        this.allowFloats = options.allowFloats ?? false;
        this.calls = 0;
    }

    getCalledCount() {
        return this.calls;
    }

    validateInput(numbers) {
        if (typeof numbers !== 'string') {
            throw new Error('Input must be a string');
        }
    }

    parseNumber(num) {
        const parsed = this.allowFloats ? parseFloat(num) : parseInt(num, 10);
        if (isNaN(parsed)) {
            throw new Error(`Invalid number: ${num}`);
        }
        return parsed;
    }

    add(numbers) {
        this.calls++;
        this.validateInput(numbers);

        if (numbers === '') {
            return 0;
        }

        let delimiter = ',';
        let numberString = numbers;

        // Handle custom delimiter
        if (numbers.startsWith('//')) {
            const delimiterEnd = numbers.indexOf('\n');
            if (delimiterEnd === -1) {
                throw new Error('Invalid custom delimiter format');
            }
            delimiter = numbers.substring(2, delimiterEnd);
            numberString = numbers.substring(delimiterEnd + 1);
        }

        // Create regex pattern for splitting (handle multiple character delimiters)
        const delimiterPattern = new RegExp(`[${delimiter}\\n]+`);

        // Split and parse numbers
        const nums = numberString
            .split(delimiterPattern)
            .filter(n => n !== '')
            .map(n => this.parseNumber(n));

        // Check for negative numbers
        const negativeNumbers = nums.filter(n => n < 0);
        if (negativeNumbers.length > 0) {
            throw new Error(`negative numbers not allowed: ${negativeNumbers.join(',')}`);
        }

        // Handle numbers greater than maxNumber
        const validNumbers = nums.filter(n => {
            if (this.ignoreGreaterThan) {
                return n <= this.maxNumber;
            }
            if (n > this.maxNumber) {
                throw new Error(`numbers cannot be greater than ${this.maxNumber}`);
            }
            return true;
        });

        return validNumbers.reduce((sum, num) => sum + num, 0);
    }
}
