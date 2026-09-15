class ArrayWrapper {
    constructor(nums) {
        this.nums = nums;
    }
    // + converts both operands to primitives by calling valueOf on each
    // before adding, so summing the stored elements here makes wrapper
    // addition yield the combined element total.
    valueOf() {
        return this.nums.reduce((sum, x) => sum + x, 0);
    }
    // String() (and template interpolation) falls back to toString,
    // which renders the comma-separated bracketed form "[a,b,c]" — an
    // empty array joins to "" and keeps its bare brackets, "[]".
    toString() {
        return "[" + this.nums.join(",") + "]";
    }
}

class Solution {
    solve(wrapperCase) {
        const wrappers = wrapperCase.arrays.map((nums) => new ArrayWrapper(nums));
        if (wrapperCase.operation === "String") {
            return String(wrappers[0]);
        }
        // Left-to-right fold with the real operator: the first reduction
        // adds two instances (both valueOf paths fire), later steps add a
        // plain number to the next instance, matching chained additions
        // exactly because integer summing is associative.
        return wrappers.reduce((sum, wrapper) => sum + wrapper);
    }
}
