/**
 * @param {number[]} nums
 * @return {number}
 */
var specialTriplets = function (nums) {
    // Sweep the middle index j while keeping counts of every value
    // strictly left and strictly right of it: j with v = nums[j]
    // contributes left[2v] * right[2v]. The total is bounded by
    // C(10^5, 3) ≈ 1.7 * 10^14 < 2^53, so plain numbers stay exact
    // through the final modulo.
    const right = new Array(200001).fill(0);
    for (const x of nums) right[x]++;
    const left = new Array(200001).fill(0);
    let ans = 0;
    for (const v of nums) {
        right[v]--;
        ans += left[2 * v] * right[2 * v];
        left[v]++;
    }
    return ans % 1000000007;
};
