function canPartitionKSubsets(nums: number[], k: number): boolean {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % k !== 0) return false;
    const target = total / k;
    // Largest elements are hardest to place; descending order prunes early.
    nums.sort((a, b) => b - a);
    if (nums[0] > target) return false;
    const n = nums.length;
    const full = (1 << n) - 1;
    const memo = new Map<number, boolean>();

    // State: bitmask of placed elements plus curr, the partial sum of the
    // subset currently being filled.
    const dfs = (mask: number, curr: number): boolean => {
        if (mask === full) return true;
        // Subset complete: start the next one from zero.
        if (curr === target) return dfs(mask, 0);
        const key = mask * (target + 1) + curr;
        if (memo.has(key)) return memo.get(key)!;
        // Try every unused element that still fits under the target.
        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) continue;
            if (curr + nums[i] <= target) {
                if (dfs(mask | (1 << i), curr + nums[i])) {
                    memo.set(key, true);
                    return true;
                }
            }
        }
        memo.set(key, false);
        return false;
    };

    return dfs(0, 0);
}
