// Problem-provided oracle (MountainArray), TypeScript side. Compiled
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the sequence's values (generic
// array) and the query budget. Integers may arrive as BigInt for
// exactness.
class MountainArray {
    private values: number[];
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.values = construction[0].map((item: any) => Number(item));
        this.budget = Number(budget);
    }

    get(index: number): number {
        if (this.budget <= 0) {
            throw new Error("MountainArray query budget exhausted");
        }
        this.budget -= 1;
        if (index < 0 || index >= this.values.length) {
            throw new Error("MountainArray index out of range");
        }
        return this.values[index];
    }

    length(): number {
        return this.values.length;
    }
}
