/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // Triples are collected under their three sorted values as a string
    // key, so a value triple that closes at several positions arrives
    // several times but is kept once.
    const triples = new Set();
    // Pin each distinct value once, at its first occurrence: the suffix
    // behind the first occurrence is a superset of every later one, so no
    // distinct triple is lost and identical re-scans are skipped.
    const pinned = new Set();
    for (let i = 0; i + 2 < nums.length; i++) {
        const first = nums[i];
        if (pinned.has(first)) continue;
        pinned.add(first);
        // Values already passed in this suffix. A complement found here
        // sits strictly between i and the closing element, so the three
        // values occupy three different positions.
        const seen = new Set();
        for (let j = i + 1; j < nums.length; j++) {
            const complement = -(first + nums[j]);
            if (seen.has(complement)) {
                const triple = [first, complement, nums[j]].sort((a, b) => a - b);
                triples.add(`${triple[0]},${triple[1]},${triple[2]}`);
            }
            seen.add(nums[j]);
        }
    }
    // Unpack the keys and sort numerically -- string order would misplace
    // the negatives -- to deliver the ascending, lexicographic order the
    // statement fixes.
    return [...triples]
        .map((key) => key.split(",").map(Number))
        .sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
};
