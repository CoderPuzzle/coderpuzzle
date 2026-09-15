// Splits target into k full copies plus a remainder: any n consecutive
// elements of the infinite array sum to total, so a remainder hit is a
// window of length < n with sum rem, and one doubled copy contains every
// such window for every start phase. Prefix sums reach
// 2 * sum(nums) = 2 * 10^10 < 2^53, so every value here stays an exact
// double.
function minSizeSubarray(nums: number[], target: number): number {
    const total = nums.reduce((a, b) => a + b, 0);
    const n = nums.length;
    const k = Math.floor(target / total);
    const rem = target % total;
    if (rem === 0) {
        return k * n;
    }
    const doubled = nums.concat(nums);
    const first = new Map<number, number>([[0, -1]]);
    let pre = 0;
    let best = -1;
    for (let i = 0; i < doubled.length; ++i) {
        pre += doubled[i];
        const j = first.get(pre - rem);
        if (j !== undefined && (best < 0 || i - j < best)) {
            best = i - j;
        }
        if (!first.has(pre)) {
            first.set(pre, i);
        }
    }
    return best < 0 ? -1 : k * n + best;
}
