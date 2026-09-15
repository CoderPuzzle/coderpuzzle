// The suffix at i is total minus the prefix before it, so one running total
// plus the array total covers every index in a single pass. |score| <=
// 1e5 * 1e5 = 1e10 < 2^53, so plain numbers stay exact.
function maximumSumScore(nums: number[]): number {
    let total = 0;
    for (const value of nums) {
        total += value;
    }
    let prefix = 0;
    let best = -Infinity;
    for (const value of nums) {
        prefix += value;
        best = Math.max(best, prefix, total - prefix + value);
    }
    return best;
}
