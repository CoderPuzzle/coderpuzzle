// Problem-provided oracle (ArrayReader), TypeScript side. Compiled with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden binary array (generic
// array). Integers may arrive as BigInt for exactness. The oracle
// enforces the problem's own 2n query budget itself, independent of
// whatever budget the harness supplies.
class ArrayReader {
    private nums: number[];
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.nums = construction[0].map((item: any) => Number(item));
        this.budget = 2 * this.nums.length;
    }

    query(a: number, b: number, c: number, d: number): number {
        if (this.budget <= 0) {
            throw new Error("ArrayReader query budget exhausted");
        }
        this.budget -= 1;
        const ones = this.nums[a] + this.nums[b] + this.nums[c] + this.nums[d];
        if (ones === 0 || ones === 4) {
            return 4;
        }
        if (ones === 1 || ones === 3) {
            return 2;
        }
        return 0;
    }

    length(): number {
        return this.nums.length;
    }
}
