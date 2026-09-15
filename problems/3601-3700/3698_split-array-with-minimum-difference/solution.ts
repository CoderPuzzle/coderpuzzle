function splitArray(nums: number[]): number {
    const n = nums.length;
    // e ends the longest strictly increasing prefix: a left part
    // nums[0..i] is strictly increasing exactly when i <= e.
    let e = 0;
    while (e + 1 < n && nums[e + 1] > nums[e]) {
        e++;
    }
    // s starts the longest strictly decreasing suffix: a right part
    // nums[i+1..n-1] is strictly decreasing exactly when i + 1 >= s.
    let s = n - 1;
    while (s > 0 && nums[s - 1] > nums[s]) {
        s--;
    }
    // One scan accumulates the left sum; the right sum is the total minus
    // it. Only indices inside the anchor window are scored. Sums reach
    // 10^10, far below 2^53, so plain numbers stay exact.
    let total = 0;
    for (const x of nums) {
        total += x;
    }
    let best = -1;
    let left = 0;
    for (let i = 0; i + 1 < n; i++) {
        left += nums[i];
        if (i + 1 >= s && i <= e) {
            const diff = Math.abs(left - (total - left));
            if (best === -1 || diff < best) {
                best = diff;
            }
        }
    }
    return best;
}
