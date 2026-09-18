// Problem-provided oracle (ArrayReader), TypeScript side. Compiled
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden values (generic array)
// and the query budget. Integers may arrive as BigInt for exactness.
class ArrayReader {
    private values: number[];
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.values = construction[0].map((item: any) => Number(item));
        this.budget = Number(budget);
    }

    get(index: number): number {
        if (this.budget <= 0) {
            throw new Error("ArrayReader query budget exhausted");
        }
        this.budget -= 1;
        if (index >= 0 && index < this.values.length) {
            return this.values[index];
        }
        return 2147483647;
    }
}
