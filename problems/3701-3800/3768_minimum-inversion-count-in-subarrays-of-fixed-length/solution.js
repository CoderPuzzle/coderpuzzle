/**
 * @param {number[]} nums
 * @return {number}
 */
var minInversionCount = function (nums, k) {
    // Two neighboring windows share k - 1 elements, so the inversion
    // count updates in O(log n) per slide instead of a recount: the
    // element leaving at the front loses its pairs with smaller
    // survivors, the element entering at the back gains pairs with
    // larger survivors. Both are dynamic rank queries over the window's
    // values, so keep the window's elements counted in a Fenwick tree
    // indexed by compressed value.
    const vals = [...new Set(nums)].sort((a, b) => a - b);
    const rank = new Map(vals.map((v, i) => [v, i + 1]));
    const m = vals.length;
    // The running count reaches k * (k - 1) / 2, at most ~5 * 10^9 for the
    // largest window — well under Number.MAX_SAFE_INTEGER (~9 * 10^15), so
    // plain numbers stay exact and no BigInt is needed.
    const tree = new Array(m + 1).fill(0);
    const query = (index) => {
        let total = 0;
        for (; index > 0; index &= index - 1) {
            total += tree[index];
        }
        return total;
    };
    const update = (index, delta) => {
        for (; index <= m; index += index & -index) {
            tree[index] += delta;
        }
    };

    // Build the first window; size - prefix(rank) counts elements already
    // inside that are strictly greater than the one being added. Order
    // matters on every slide: drop the front element from the tree and
    // subtract its smaller companions BEFORE the new element joins, then
    // insert the newcomer and add its strictly larger companions — querying
    // against the wrong intermediate window double-counts when the two
    // values are equal. Strict comparisons throughout: equal neighbors are
    // not inversions.
    let inversions = 0;
    for (let i = 0; i < k; ++i) {
        const rx = rank.get(nums[i]);
        inversions += i - query(rx);
        update(rx, 1);
    }
    let best = inversions;
    for (let right = k; right < nums.length; ++right) {
        const ry = rank.get(nums[right - k]);
        const rx = rank.get(nums[right]);
        inversions -= query(ry - 1);
        update(ry, -1);
        inversions += k - 1 - query(rx);
        update(rx, 1);
        if (inversions < best) {
            best = inversions;
        }
    }
    return best;
};
