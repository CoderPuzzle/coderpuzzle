function binarySearchableNumbers(nums: number[]): number {
    // A value is guaranteed found iff every element left of it is smaller
    // and every element right of it is larger, so a smaller right pivot or
    // a larger left pivot can never discard it. Compare each value against
    // a running prefix max and a precomputed suffix min.
    const n = nums.length;
    const suffixMin = new Int32Array(n);
    suffixMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; --i) {
        suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);
    }
    let count = 0;
    let prefixMax = nums[0];
    for (let i = 0; i < n; ++i) {
        if ((i === 0 || nums[i] > prefixMax) && (i === n - 1 || nums[i] < suffixMin[i + 1])) {
            ++count;
        }
        if (nums[i] > prefixMax) prefixMax = nums[i];
    }
    return count;
}
