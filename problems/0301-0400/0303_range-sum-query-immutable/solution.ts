class NumArray {
    // prefix[i] = sum of the first i elements, with prefix[0] = 0 so
    // no query needs a special case for a left edge of zero.
    private prefix: number[];

    constructor(nums: number[]) {
        this.prefix = new Array(nums.length + 1).fill(0);
        // One left-to-right pass; each entry extends the previous by one
        // element. The array is fixed, so summing happens once, not per
        // query.
        for (let index = 0; index < nums.length; index++) {
            this.prefix[index + 1] = this.prefix[index] + nums[index];
        }
    }

    sumRange(left: number, right: number): number {
        // The elements before left cancel, telescoping the range sum
        // into a difference of two prefixes — O(1) per query.
        return this.prefix[right + 1] - this.prefix[left];
    }
}
