/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function (nums, k) {
    // One count map carries both halves: its keys are the distinct values,
    // so v + k membership is O(1), and its frequencies are exactly what
    // k == 0 asks for. A pair is identified by its two values, so repeats
    // enter the same pair at most once.
    const counts = new Map();
    for (const value of nums) {
        counts.set(value, (counts.get(value) || 0) + 1);
    }
    let pairs = 0;
    if (k === 0) {
        // A 0-diff pair needs two equal values at different indexes, so a
        // value contributes once when it occurs at least twice — further
        // copies add nothing.
        for (const frequency of counts.values()) {
            if (frequency > 1) pairs++;
        }
        return pairs;
    }
    // k > 0: count each distinct value whose partner v + k is also present;
    // scanning only upward pairs every couple exactly once and never matches
    // a value with itself.
    for (const value of counts.keys()) {
        if (counts.has(value + k)) pairs++;
    }
    return pairs;
};
