/**
 * @param {number[]} nums
 * @return {number}
 */
var perfectPairs = function (nums) {
    // Signs never matter: with x = |a| <= y = |b| a pair is perfect
    // exactly when y <= 2x, so work in sorted absolute values and count,
    // for each i, the later entries within double of a[i].
    const a = nums.map((v) => Math.abs(v)).sort((p, q) => p - q);
    // The doubled bound 2 * a[i] never shrinks as i moves right, so the
    // frontier j only ever advances; positions strictly between i and j
    // pair with i. Counts stay far below 2^53, so numbers are exact.
    let ans = 0;
    let j = 0;
    for (let i = 0; i < a.length; i++) {
        while (j < a.length && a[j] <= 2 * a[i]) {
            j++;
        }
        ans += j - i - 1;
    }
    return ans;
};
