// Problem-provided oracle (HiddenNumber), TypeScript side. Compiled with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden number (generic value) and
// the query budget. Integers may arrive as BigInt for exactness.
class HiddenNumber {
    private n: number;
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.n = Number(construction[0]);
        this.budget = Number(budget);
    }

    commonSetBits(num: number): number {
        if (this.budget <= 0) {
            throw new Error("HiddenNumber query budget exhausted");
        }
        this.budget -= 1;
        let count = 0;
        let shared = (this.n & num) >>> 0;
        while (shared !== 0) {
            count += shared & 1;
            shared >>= 1;
        }
        return count;
    }
}
