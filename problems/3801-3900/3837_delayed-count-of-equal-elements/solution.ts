// Sweep i from the right; freq counts occurrences of each value in
// the window [i + k + 1, n - 1], so stepping i down inserts exactly
// nums[i + k + 1] and the delayed count is a single lookup.
function delayedCount(nums: number[], k: number): number[] {
    const n: number = nums.length;
    const ans: number[] = new Array(n).fill(0);
    const freq: Map<number, number> = new Map();
    for (let i = n - 1; i >= 0; i--) {
        const ahead: number = i + k + 1;
        if (ahead < n) {
            freq.set(nums[ahead], (freq.get(nums[ahead]) || 0) + 1);
        }
        ans[i] = freq.get(nums[i]) || 0;
    }
    return ans;
}
