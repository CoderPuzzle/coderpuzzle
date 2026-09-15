/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMoves = function (nums, k) {
    if (k <= 1) return 0;
    const pos = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) pos.push(i);
    }
    const m = pos.length;
    // q[i] = pos[i] - i shifts the i-th one left past the ones before it,
    // so in q-space every one costs exactly one swap per position moved.
    const q = new Array(m);
    const pref = new Array(m + 1);
    pref[0] = 0;
    for (let i = 0; i < m; i++) {
        q[i] = pos[i] - i;
        pref[i + 1] = pref[i] + q[i];
    }
    let best = Infinity;
    // The optimal group of k ones is consecutive in pos; gather each window
    // on the median of its q values, which minimizes the total L1 distance.
    for (let i = 0; i + k <= m; i++) {
        const mid = i + Math.floor(k / 2);
        // Left half pulled onto the median, right half symmetrically, both
        // in O(1) via the prefix sums.
        const left = q[mid] * (mid - i) - (pref[mid] - pref[i]);
        const right = pref[i + k] - pref[mid + 1] - q[mid] * (i + k - 1 - mid);
        const cost = left + right;
        if (cost < best) best = cost;
    }
    return best;
};
