// Problem-provided oracle (CommonBits), TypeScript side. Compiled with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the initial hidden number (generic
// value) and the query budget. Integers may arrive as BigInt for
// exactness.
class CommonBits {
    private n: number;
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.n = Number(construction[0]);
        this.budget = Number(budget);
    }

    commonBits(num: number): number {
        if (this.budget <= 0) {
            throw new Error("CommonBits query budget exhausted");
        }
        this.budget -= 1;
        let diff = (this.n ^ num) & 0x3fffffff;
        let agreements = 30;
        while (diff !== 0) {
            agreements -= diff & 1;
            diff >>>= 1;
        }
        this.n ^= num;
        return agreements;
    }
}
