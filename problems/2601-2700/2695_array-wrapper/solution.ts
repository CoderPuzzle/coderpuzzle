class ArrayWrapper {
    nums: number[];

    constructor(nums: number[]) {
        this.nums = nums;
    }
    // + converts both operands to primitives by calling valueOf on each
    // before adding, so summing the stored elements here makes wrapper
    // addition yield the combined element total.
    valueOf(): number {
        return this.nums.reduce((sum: number, x: number): number => sum + x, 0);
    }
    // String() (and template interpolation) falls back to toString,
    // which renders the comma-separated bracketed form "[a,b,c]" — an
    // empty array joins to "" and keeps its bare brackets, "[]".
    toString(): string {
        return "[" + this.nums.join(",") + "]";
    }
}

class Solution {
    solve(wrapperCase: WrapperCase): number {
        const wrappers = wrapperCase.arrays.map((nums: number[]): ArrayWrapper => new ArrayWrapper(nums));
        if (wrapperCase.operation === "String") {
            // The declared return kind covers the additive path; the
            // rendered string flows through `any`, exactly as the landed
            // call/bind carriers pass their mixed-kind results through.
            const rendered: any = String(wrappers[0]);
            return rendered;
        }
        // Left-to-right fold with the real operator: every step asks the
        // next instance for its primitive (valueOf fires), so the running
        // total matches chained additions exactly because integer summing
        // is associative. The accumulator flows through `any` because
        // TypeScript's static arithmetic does not model the Number(valueOf)
        // conversion that the runtime applies to the object operand.
        let total: any = 0;
        for (const wrapper of wrappers) {
            total = total + wrapper;
        }
        return total;
    }
}
