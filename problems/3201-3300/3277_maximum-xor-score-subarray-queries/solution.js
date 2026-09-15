/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var maximumSubarrayXor = function (nums, queries) {
    // One round of the score process turns an array into its adjacent
    // XORs, so unrolling the rounds gives a Pascal-style recurrence over
    // GF(2): score[l][r] = score[l][r-1] ^ score[l+1][r], seeded by the
    // singleton subarrays — binomial coefficients mod 2 decide which
    // elements reach the final XOR. On top of the score rows we fold a
    // running maximum: best[l][r], the largest score of any subarray
    // inside [l..r], splits by endpoints into max(score[l][r],
    // best[l][r-1], best[l+1][r]) — any such subarray either drops the
    // left end, drops the right end, or is [l..r] itself. Rows are built
    // for l = n-1 down to 0, keeping only the previous score row while
    // every finished best row is stored, so a query is one lookup into
    // its left endpoint's row: O(n^2 + q) time and O(n^2) stored cells.
    // Every element is at most 2^31 - 1, so bit 31 is always 0, and the
    // XOR of two bit-31-zero words has bit 31 zero too — by induction
    // every score lies in [0, 2^31 - 1]. Such values are unchanged by
    // ToInt32 and their XOR pattern reads back non-negative, so the
    // 32-bit bitwise ops are exact rather than sign-truncating; they are
    // also far below 2^53, so plain number arithmetic stays exact.
    const n = nums.length;
    const bestRows = new Array(n);
    let prevScore = new Int32Array(0);
    let prevBest = new Int32Array(0);
    for (let left = n - 1; left >= 0; left--) {
        const width = n - left;
        const curScore = new Int32Array(width);
        const curBest = new Int32Array(width);
        curScore[0] = curBest[0] = nums[left];
        for (let j = 1; j < width; j++) {
            const s = curScore[j - 1] ^ prevScore[j - 1];
            curScore[j] = s;
            curBest[j] = Math.max(s, curBest[j - 1], prevBest[j - 1]);
        }
        bestRows[left] = curBest;
        prevScore = curScore;
        prevBest = curBest;
    }
    return queries.map(([left, right]) => bestRows[left][right - left]);
};
