function minimumSum(nums: number[]): number {
    // The best mountain through a peak j pairs nums[j] with the smallest
    // value on each side, so running minima from both ends bracket every
    // candidate; both side values must sit strictly below the peak.
    const n = nums.length;
    const leftMin = [...nums];
    for (let i = 1; i < n; ++i) {
        leftMin[i] = Math.min(leftMin[i - 1], nums[i]);
    }
    const rightMin = [...nums];
    for (let i = n - 2; i >= 0; --i) {
        rightMin[i] = Math.min(rightMin[i + 1], nums[i]);
    }
    let best = -1;
    for (let j = 1; j < n - 1; ++j) {
        const low = leftMin[j - 1];
        const high = rightMin[j + 1];
        if (low < nums[j] && high < nums[j]) {
            const total = low + nums[j] + high;
            if (best === -1 || total < best) {
                best = total;
            }
        }
    }
    return best;
}
