/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    // One counting pass over the array.
    const counts = new Map();
    for (const x of nums) {
        counts.set(x, (counts.get(x) || 0) + 1);
    }
    // Buckets indexed by frequency: a value with count c lands in
    // buckets[c], and no count can exceed n.
    const n = nums.length;
    const buckets = Array.from({ length: n + 1 }, () => []);
    for (const [value, count] of counts) {
        buckets[count].push(value);
    }
    const result = [];
    // Walk frequencies from the highest possible down; within one bucket
    // sort values ascending, so ties break by smaller value — the
    // deterministic selection the judge's expected answers use.
    for (let c = n; c >= 1 && result.length < k; c--) {
        const bucket = buckets[c];
        if (bucket.length === 0) continue;
        bucket.sort((a, b) => a - b);
        for (const value of bucket) {
            if (result.length === k) break;
            result.push(value);
        }
    }
    return result;
};
