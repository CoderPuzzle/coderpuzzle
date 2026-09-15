// Problem-provided oracle (ArrayReader), TypeScript side. Compiled
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden array (generic array of
// values) and the query budget. Integers may arrive as BigInt for
// exactness.
class ArrayReader {
    private values: number[];
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.values = construction[0].map((entry: any) => Number(entry));
        this.budget = Number(budget);
    }

    compareSub(l: number, r: number, x: number, y: number): number {
        if (this.budget <= 0) {
            throw new Error("ArrayReader query budget exhausted");
        }
        this.budget -= 1;
        let left = 0;
        for (let i = l; i <= r; i++) {
            left += this.values[i];
        }
        let right = 0;
        for (let i = x; i <= y; i++) {
            right += this.values[i];
        }
        if (left > right) {
            return 1;
        }
        if (left < right) {
            return -1;
        }
        return 0;
    }

    length(): number {
        return this.values.length;
    }
}
