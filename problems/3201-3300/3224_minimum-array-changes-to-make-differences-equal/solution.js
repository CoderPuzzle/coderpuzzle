/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minChanges = function (nums, k) {
    // Every symmetric pair (nums[i], nums[n-1-i]) must end up exactly d
    // apart for one shared difference d, so the answer is the cheapest
    // per-pair total over all k + 1 candidates. Sorted as lo <= hi, a
    // pair whose difference already equals d costs 0; otherwise one
    // replacement fixes it exactly when the moved value stays inside
    // [0, k], which is equivalent to d <= hi or d <= k - lo; failing
    // that, the pair costs 2. Bucket exact matches and add a +1 range
    // mark for each one-change reach, then sweep d once: cost(d) =
    // n - reachable(d) - exact(d). Totals stay far below 2^53.
    const half = nums.length >> 1;
    const exact = new Array(k + 1).fill(0);
    const delta = new Array(k + 2).fill(0);
    for (let i = 0; i < half; i++) {
        let a = nums[i];
        let b = nums[nums.length - 1 - i];
        if (a > b) {
            const t = a;
            a = b;
            b = t;
        }
        exact[b - a]++;
        const reach = Math.max(b, k - a);
        delta[0]++;
        delta[reach + 1]--;
    }
    let best = 2 * half;
    let reachable = 0;
    for (let d = 0; d <= k; d++) {
        reachable += delta[d];
        best = Math.min(best, 2 * half - reachable - exact[d]);
    }
    return best;
};
