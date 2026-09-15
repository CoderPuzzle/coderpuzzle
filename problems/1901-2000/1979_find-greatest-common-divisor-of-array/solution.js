/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function (nums) {
    let mn = nums[0];
    let mx = nums[0];
    for (const value of nums) {
        mn = Math.min(mn, value);
        mx = Math.max(mx, value);
    }
    while (mx) {
        const t = mn % mx;
        mn = mx;
        mx = t;
    }
    return mn;
};
