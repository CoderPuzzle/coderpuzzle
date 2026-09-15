function wiggleSort(nums: number[]): number[] {
    // Sort a copy, then fill the even slots from the back of the lower
    // half and the odd slots from the back of the upper half: reversing
    // each half keeps median duplicates as far apart as possible.
    const ordered = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    const m = Math.floor((n + 1) / 2);
    for (let k = 0; k < m; ++k) {
        nums[2 * k] = ordered[m - 1 - k];
    }
    for (let k = 0; k < n - m; ++k) {
        nums[2 * k + 1] = ordered[n - 1 - k];
    }
    return nums;
}
