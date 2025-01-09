import { StringCalculator } from './StringCalculator.js';

function demonstrateCalculator() {
    const calculator = new StringCalculator({
        maxNumber: 1000,
        allowFloats: true
    });

    console.log('String Calculator Demonstration');
    console.log('------------------------------');

    const examples = [
        '',
        '1',
        '1,5',
        '1\n2,3',
        '//;\n1;2',
        '1.5,2.7',
        '999,1001', // Will ignore 1001
        '//[***]\n1***2***3'
    ];

    examples.forEach(example => {
        try {
            const result = calculator.add(example);
            console.log(`Input: "${example}"`);
            console.log(`Output: ${result}`);
            console.log(`Call count: ${calculator.getCalledCount()}`);
            console.log('------------------------------');
        } catch (error) {
            console.log(`Input: "${example}"`);
            console.log(`Error: ${error.message}`);
            console.log('------------------------------');
        }
    });
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
    demonstrateCalculator();
}