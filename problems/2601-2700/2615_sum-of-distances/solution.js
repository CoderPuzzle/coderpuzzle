/**
 * @param {number[]} nums
 * @return {number[]}
 */
var distance = function (nums) {
    // Only equal values interact, so bucket indices by value; each bucket is
    // an independent 1-D problem over its sorted occurrence list.
    const pos = new Map();
    for (let i = 0; i < nums.length; i++) {
        const x = nums[i];
        if (!pos.has(x)) pos.set(x, []);
        pos.get(x).push(i);
    }
    const arr = new Array(nums.length).fill(0);
    for (const idxs of pos.values()) {
        const m = idxs.length;
        // Prefix sums of the occurrence indices turn every distance total
        // into O(1) arithmetic — vital since one value may dominate.
        const prefix = new Array(m + 1).fill(0);
        for (let j = 0; j < m; j++) {
            prefix[j + 1] = prefix[j] + idxs[j];
        }
        for (let j = 0; j < m; j++) {
            const i = idxs[j];
            // j earlier occurrences each at distance i - idx, then m - 1 - j
            // later ones each at distance idx - i:
            const left = i * j - prefix[j];
            const right = prefix[m] - prefix[j + 1] - i * (m - 1 - j);
            arr[i] = left + right;
        }
    }
    return arr;
};
