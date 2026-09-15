// Problem-provided oracle (the hidden f(x, y) wire). The wrapper constructs
// the oracle from its tagged case values plus the query budget; values[0]
// is the generic case integer for function_id.
class CustomFunction {
    private functionId: number;
    private budget: number;

    constructor(values: any[], budget: number) {
        this.functionId = values[0];
        this.budget = budget;
    }

    // Returns some positive integer f(x, y) for two positive integers x and
    // y based on a formula.
    f(x: number, y: number): number {
        if (this.budget <= 0) throw new Error("Oracle query budget exhausted");
        this.budget -= 1;
        switch (this.functionId) {
            case 1:
                return x + y;
            case 2:
                return x * y;
            case 3:
                return x * x + y;
            case 4:
                return x + y * y;
            case 5:
                return x * x + y * y;
            case 6:
                return 10 * x + y;
            case 7:
                return x * x * x + y * y * y;
            case 8:
                return (x + y) * (x + y);
            case 9:
                return x * y + x + y;
            default:
                throw new Error("Unknown function_id");
        }
    }
}
