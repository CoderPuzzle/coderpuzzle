class Solution {
    private original: number[];

    // The pristine original is kept untouched; every shuffle() runs
    // Fisher-Yates on a fresh copy — slot i (from the top down) swaps with a
    // uniformly chosen slot in [0, i] — so each of the n! orderings is
    // exactly equally likely, and reset() is a plain copy.
    constructor(nums: number[]) {
        this.original = nums.slice();
    }

    reset(): number[] {
        return this.original.slice();
    }

    shuffle(): number[] {
        const array = this.original.slice();
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
