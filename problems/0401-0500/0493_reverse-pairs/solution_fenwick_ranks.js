/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
    // Fenwick over compressed ranks instead of merge-sort counting: walk
    // right-to-left, so by the time the walk reaches an entry the tree
    // holds exactly the entries to that entry's right.
    const vals = [...new Set(nums)].sort((a, b) => a - b);
    // Thresholds ride beside the ranks: x qualifies against v exactly
    // when 2 * v < x, and doubling stays wide so both int32 extremes
    // remain honest (JS numbers carry 2 * int32 exactly).
    const doubled = vals.map((v) => 2 * v);
    const size = vals.length;
    const bit = new Array(size + 1).fill(0);

    const update = (i, delta) => {
        while (i <= size) {
            bit[i] += delta;
            i += i & -i;
        }
    };
    const query = (i) => {
        let total = 0;
        while (i > 0) {
            total += bit[i];
            i -= i & -i;
        }
        return total;
    };
    const lowerBound = (a, target) => {
        let lo = 0;
        let hi = a.length;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (a[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };

    let count = 0;
    for (let k = nums.length - 1; k >= 0; k--) {
        // Every held value with 2 * v < nums[k] ranks below the cut, so the
        // prefix query totals exactly the later entries nums[k] more than
        // doubles — and querying before inserting keeps it from counting
        // itself.
        count += query(lowerBound(doubled, nums[k]));
        update(lowerBound(vals, nums[k]) + 1, 1);
    }
    return count;
};
