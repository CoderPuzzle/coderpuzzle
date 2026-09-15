/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumTop = function (nums, k) {
    // Which tops are reachable in exactly k moves is pure move-budget
    // casework; each branch is answered without simulating k moves.
    const n = nums.length;
    if (k === 0) {
        return nums[0];
    }
    if (n === 1) {
        // The lone element alternates removed/back, so odd k empties it.
        return k % 2 === 0 ? nums[0] : -1;
    }
    if (k === 1) {
        // No removed elements exist yet, so the single move is a pop.
        return nums[1];
    }
    if (k > n) {
        // Remove everything, burn all but the last move in pop/push
        // pairs, then push the maximum back on.
        let best = nums[0];
        for (let i = 1; i < n; i++) {
            if (nums[i] > best) {
                best = nums[i];
            }
        }
        return best;
    }
    // 2 <= k <= n: either k pure removals expose nums[k], or removals
    // plus one push-back land any nums[i] with i <= k-2 on top.
    // values are <= 10^9, and the branch only compares them, so plain
    // number arithmetic stays exact
    let best = k < n ? nums[k] : -1;
    for (let i = 0; i < k - 1; i++) {
        if (nums[i] > best) {
            best = nums[i];
        }
    }
    return best;
};
