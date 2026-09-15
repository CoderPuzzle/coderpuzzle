/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minSubarray = function (nums, p) {
    const n = nums.length;
    // JS numbers are exact doubles up to 2^53, comfortably covering the
    // 1e14 total, so no extra accumulation care is needed.
    let total = 0;
    for (const value of nums) total += value;
    const target = total % p;
    if (target === 0) return 0;

    // Map each running prefix remainder to its most recent index, seeded
    // with the empty prefix (remainder 0 at index -1).
    const lastIndex = new Map([[0, -1]]);
    let running = 0;
    let best = n;
    for (let index = 0; index < n; ++index) {
        running = (running + nums[index]) % p;
        const needed = (((running - target) % p) + p) % p;
        const earlier = lastIndex.get(needed);
        // A match spanning the full array (earlier === -1 at the last
        // index) would remove everything, which is disallowed — cap the
        // span below n to reject exactly that one case.
        if (earlier !== undefined) {
            const span = index - earlier;
            if (span < n && span < best) best = span;
        }
        lastIndex.set(running, index);
    }

    return best < n ? best : -1;
};
