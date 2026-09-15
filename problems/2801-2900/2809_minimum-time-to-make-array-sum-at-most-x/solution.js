/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} x
 * @return {number}
 */
var minimumTime = function (nums1, nums2, x) {
    // Exchange arguments: each index needs zeroing at most once ("shift
    // left" removes repeats), and among the kept zeroings larger rates
    // belong later - taking element e as operation j removes
    // nums1[e] + nums2[e] * j of the eventual sum. Sort ascending by rate.
    const n = nums1.length;
    const order = Array.from({ length: n }, (_, index) => index);
    order.sort((left, right) => nums2[left] - nums2[right]);
    let base = 0;
    let growth = 0;
    for (const value of nums1) {
        base += value;
    }
    for (const value of nums2) {
        growth += value;
    }
    // Best[j] = the most removable using exactly j operations among the
    // elements processed so far; every value stays below ~1.1 * 10^9, far
    // inside exact double precision (< 2^53).
    const best = new Array(n + 1).fill(0);
    for (let position = 1; position <= n; position++) {
        const index = order[position - 1];
        const initial = nums1[index];
        const rate = nums2[index];
        for (let count = position; count >= 1; count--) {
            const candidate = best[count - 1] + initial + rate * count;
            if (candidate > best[count]) {
                best[count] = candidate;
            }
        }
    }
    for (let time = 0; time <= n; time++) {
        if (base + growth * time - best[time] <= x) {
            return time;
        }
    }
    return -1;
};
