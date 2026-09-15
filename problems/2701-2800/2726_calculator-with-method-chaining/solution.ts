class Calculator implements ChainedCalculation {
    private result: number;

    constructor(value: number) {
        this.result = value;
    }

    add(value: number): ChainedCalculation {
        this.result += value;
        return this;
    }

    subtract(value: number): ChainedCalculation {
        this.result -= value;
        return this;
    }

    multiply(value: number): ChainedCalculation {
        this.result *= value;
        return this;
    }

    divide(value: number): ChainedCalculation {
        if (value === 0) {
            throw new Error("Division by zero is not allowed");
        }
        this.result /= value;
        return this;
    }

    power(value: number): ChainedCalculation {
        this.result **= value;
        return this;
    }

    getResult(): number {
        return this.result;
    }
}

class Solution {
    solve(calculatorCase: CalculatorCase): void {
        calculatorCase.drive(Calculator);
    }
}
