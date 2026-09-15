function minimumSwaps(nums: number[]): number {
    const n = nums.length;
    let i = 0;
    for (let k = 1; k < n; k++) {
        if (nums[k] < nums[i]) {
            i = k;
        }
    }
    let j = n - 1;
    for (let k = n - 2; k >= 0; k--) {
        if (nums[k] > nums[j]) {
            j = k;
        }
    }
    return i + (n - 1 - j) - (j < i ? 1 : 0);
}
