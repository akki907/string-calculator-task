# String Calculator TDD Kata

An enhanced Node.js implementation of the String Calculator TDD Kata using modern JavaScript features.


## Installation

```bash
npm install
```

## Configuration

The calculator can be instantiated with several options:

```javascript
const calculator = new StringCalculator({
    maxNumber: 1000,        // Maximum allowed number
    ignoreGreaterThan: true, // Whether to ignore or error on numbers > maxNumber
    allowFloats: false      // Whether to allow floating point numbers
});
```

## Usage Examples

```javascript
import { StringCalculator } from './src/StringCalculator.js';

const calculator = new StringCalculator();

// Basic usage
calculator.add("1,2,3");  // Returns 6

// Custom delimiter
calculator.add("//;\n1;2");  // Returns 3

// With newlines
calculator.add("1\n2,3");  // Returns 6

// Floating point (with allowFloats: true)
const floatCalc = new StringCalculator({ allowFloats: true });
floatCalc.add("1.5,2.7");  // Returns 4.2

// Get call count
calculator.getCalledCount();  // Returns number of times add() was called
```

## Error Handling

The calculator throws errors for various invalid inputs:

- Negative numbers
- Non-string input
- Invalid number format
- Numbers exceeding maximum (when configured)
- Invalid delimiter format

## Development

### Running Tests

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Linting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

### Validation

```bash
# Run all validation (linting and tests)
npm run validate
```
