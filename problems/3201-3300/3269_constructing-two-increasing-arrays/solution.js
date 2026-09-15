/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minLargest = function (nums1, nums2) {
    // Read in increasing order, any replacement becomes a merge of the
    // two arrays; replaying a merge hands each slot the smallest value
    // above its predecessor with the slot's parity, so a step adds 1
    // when the bit differs from the previous bit and 2 when it repeats.
    // dp[i][j][f] is the replay minimum after consuming i slots of
    // nums1 and j of nums2 with the last value taken by array f; two
    // rolling rows carry the table. Answers are <= 2*(n+m) <= 4000, far
    // below Number's exact range.
    const BIG = 1 << 29;
    const n = nums1.length;
    const m = nums2.length;
    let prv0 = new Array(m + 1).fill(BIG);
    let prv1 = new Array(m + 1).fill(BIG);
    if (m >= 1) {
        prv1[1] = 2 - nums2[0];
        for (let j = 2; j <= m; ++j) {
            prv1[j] = prv1[j - 1] + (nums2[j - 2] !== nums2[j - 1] ? 1 : 2);
        }
    }
    for (let i = 1; i <= n; ++i) {
        const x = nums1[i - 1];
        const stepX = i >= 2 && nums1[i - 2] !== x ? 1 : 2;
        const cur0 = new Array(m + 1).fill(BIG);
        const cur1 = new Array(m + 1).fill(BIG);
        cur0[0] = i === 1 ? 2 - x : prv0[0] + stepX;
        for (let j = 1; j <= m; ++j) {
            const y = nums2[j - 1];
            cur0[j] = Math.min(prv0[j] + stepX, prv1[j] + (y !== x ? 1 : 2));
            let best = cur0[j - 1] + (x !== y ? 1 : 2);
            if (j >= 2) {
                best = Math.min(best, cur1[j - 1] + (nums2[j - 2] !== y ? 1 : 2));
            }
            cur1[j] = best;
        }
        prv0 = cur0;
        prv1 = cur1;
    }
    return Math.min(prv0[m], prv1[m]);
};
