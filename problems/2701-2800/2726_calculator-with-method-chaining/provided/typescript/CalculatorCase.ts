// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   CalculatorCase carries one case's operation script: .actions is the
//   action list ("Calculator" first, "getResult" last) and .values holds
//   the constructor seed followed by one number per arithmetic step.
//   drive() is called by the submission with its Calculator class — the
//   driver constructs it with the first value, replays every remaining
//   action in order, and records either the final getResult() value or
//   the thrown error's message; verdict() hands that single judged answer
//   back to the harness.
const OPERATIONS = new Set(["add", "subtract", "multiply", "divide", "power"]);

// Structural shape every method-chaining Calculator must satisfy.
interface ChainedCalculation {
    add(value: number): ChainedCalculation;
    subtract(value: number): ChainedCalculation;
    multiply(value: number): ChainedCalculation;
    divide(value: number): ChainedCalculation;
    power(value: number): ChainedCalculation;
    getResult(): number;
}

class CalculatorCase {
    readonly actions: string[];
    readonly values: number[];
    private judged?: number | string;

    constructor(values: any[], _queryBudget?: unknown) {
        const [actions, inputs] = values;
        if (
            !Array.isArray(actions) ||
            actions.length < 2 ||
            actions[0] !== "Calculator" ||
            actions[actions.length - 1] !== "getResult"
        ) {
            throw new Error('actions must start with "Calculator" and end with "getResult"');
        }
        if (!Array.isArray(inputs)) {
            throw new Error("values must be an array of numbers");
        }
        let cursor = 1; // values[0] funds the constructor in drive()
        for (let at = 1; at < actions.length; at++) {
            const method = actions[at];
            if (method === "getResult") continue;
            if (!OPERATIONS.has(method)) {
                throw new Error(`unknown action ${JSON.stringify(method)}`);
            }
            if (cursor >= inputs.length || typeof inputs[cursor] !== "number") {
                throw new Error(`values needs a number for the ${at - 1} step`);
            }
            cursor++;
        }
        if (cursor !== inputs.length) {
            throw new Error(`values must supply one entry per arithmetic step (${cursor} needed)`);
        }
        this.actions = actions as string[];
        this.values = inputs as number[];
    }

    // Replay this case's script against the submission's class,
    // recording the final result — or the message of a divide-by-zero
    // throw, which ends the run where it happened.
    drive(calculatorClass: new (start: number) => ChainedCalculation): void {
        if (typeof calculatorClass !== "function") {
            throw new Error("drive expects the Calculator class");
        }
        let chained = new calculatorClass(this.values[0]);
        let cursor = 1;
        for (let at = 1; at < this.actions.length; at++) {
            const method = this.actions[at];
            if (method === "getResult") {
                this.judged = chained.getResult();
                return;
            }
            const value = this.values[cursor++];
            try {
                switch (method) {
                    case "add":
                        chained = chained.add(value);
                        break;
                    case "subtract":
                        chained = chained.subtract(value);
                        break;
                    case "multiply":
                        chained = chained.multiply(value);
                        break;
                    case "divide":
                        chained = chained.divide(value);
                        break;
                    default:
                        chained = chained.power(value);
                        break;
                }
            } catch (thrown) {
                this.judged = thrown instanceof Error ? thrown.message : String(thrown);
                return;
            }
        }
    }

    verdict(): number | string {
        if (this.judged === undefined) {
            throw new Error("drive() was never called on this case");
        }
        return this.judged;
    }
}
