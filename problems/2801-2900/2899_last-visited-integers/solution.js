/**
 * @param {number[]} nums
 * @return {number[]}
 */
var lastVisitedIntegers = function (nums) {
    // seen holds the positives with the most recent one at the front; k
    // counts consecutive -1s and every positive resets it, so each -1
    // either reads the k-th element from the front of seen — the k-th
    // most recent positive — or appends -1 when seen is too short.
    const seen = [];
    const ans = [];
    let k = 0;
    for (const num of nums) {
        if (num !== -1) {
            seen.unshift(num);
            k = 0;
        } else {
            k += 1;
            ans.push(k <= seen.length ? seen[k - 1] : -1);
        }
    }
    return ans;
};
