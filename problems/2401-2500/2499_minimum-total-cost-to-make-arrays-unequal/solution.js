/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minimumTotalCost = function (nums1, nums2) {
    // Pay every equal column tentatively and histogram their values; buy
    // the cheapest neutral columns while one value dominates the chosen
    // set. The total is bounded by n*(n-1)/2 ~ 5e9 at n = 10^5, which is
    // below 2^53, so plain numbers stay exact.
    let cost = 0;
    const cnt = new Map();
    let chosen = 0;
    let dom = -1;
    for (let i = 0; i < nums1.length; ++i) {
        if (nums1[i] === nums2[i]) {
            const c = (cnt.get(nums1[i]) || 0) + 1;
            cnt.set(nums1[i], c);
            if (c > (cnt.get(dom) || 0)) dom = nums1[i];
            chosen++;
            cost += i;
        }
    }
    if (chosen === 0) return 0;
    for (let j = 0; j < nums1.length; ++j) {
        if ((cnt.get(dom) || 0) * 2 <= chosen) break;
        if (nums1[j] !== nums2[j] && nums1[j] !== dom && nums2[j] !== dom) {
            chosen++;
            cost += j;
        }
    }
    return (cnt.get(dom) || 0) * 2 <= chosen ? cost : -1;
};
