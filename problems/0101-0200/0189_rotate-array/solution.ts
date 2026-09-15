function rotate(nums: number[], k: number): number[] {
    // Three reversals compose into a right rotation: reversing the whole
    // array trades the two blocks, and reversing each block afterwards
    // restores its internal order.
    const n = nums.length;
    // A rotation by n steps is the identity, so any larger k wraps
    // around to k % n — normalize before splitting into blocks.
    k %= n;
    const reverse = (lo: number, hi: number): void => {
        while (lo < hi) {
            [nums[lo], nums[hi]] = [nums[hi], nums[lo]];
            lo += 1;
            hi -= 1;
        }
    };
    reverse(0, n - 1);
    reverse(0, k - 1);
    reverse(k, n - 1);
    // The rotation happened inside the input allocation; the same array,
    // now rotated, is what the judge compares.
    return nums;
}
