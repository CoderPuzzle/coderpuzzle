// Problem-provided oracle (BigArray), TypeScript side. Compiled
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the maximal blocks of the hidden
// array (an array of [value, count] pairs) and the query budget.
// Integers may arrive as BigInt for exactness; lengths stay exact
// below Number.MAX_SAFE_INTEGER.
class BigArray {
    private values: number[];
    private starts: number[];
    private total: number;
    private budget: number;

    constructor(construction: any[], budget: any) {
        const blocks = construction[0];
        this.values = [];
        this.starts = [];
        let offset = 0;
        let previous: number | null = null;
        for (const block of blocks) {
            const value = Number(block[0]);
            const count = Number(block[1]);
            if (value === previous) {
                throw new Error("BigArray blocks must alternate values");
            }
            this.values.push(value);
            this.starts.push(offset);
            offset += count;
            previous = value;
        }
        this.total = offset;
        this.budget = Number(budget);
    }

    at(index: number): number {
        if (this.budget <= 0) {
            throw new Error("BigArray query budget exhausted");
        }
        this.budget -= 1;
        let lo = 0;
        let hi = this.starts.length - 1;
        let run = 0;
        while (lo <= hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (this.starts[mid] <= index) {
                run = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return this.values[run];
    }

    size(): number {
        return this.total;
    }
}
