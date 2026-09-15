/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
    // How many pairs sum to at most s? Both arrays are sorted, so a
    // descending pointer into nums2 serves every nums1[i]: the bound
    // s - nums1[i] only falls as i rises, so the pointer never turns back.
    const countAtMost = (s) => {
        let total = 0;
        let j = nums2.length - 1;
        for (const a of nums1) {
            const bound = s - a;
            while (j >= 0 && nums2[j] > bound) {
                j--;
            }
            total += j + 1;
        }
        return total;
    };
    // The k-th smallest sum is the least s with countAtMost(s) >= k.
    let lo = nums1[0] + nums2[0];
    let hi = nums1[nums1.length - 1] + nums2[nums2.length - 1];
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (countAtMost(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    const threshold = lo;
    // Every pair strictly below the threshold makes the cut — there are
    // fewer than k of them by the minimality of the threshold.
    const below = [];
    let j = nums2.length - 1;
    for (let i = 0; i < nums1.length; i++) {
        const a = nums1[i];
        while (j >= 0 && a + nums2[j] >= threshold) {
            j--;
        }
        for (let jj = 0; jj <= j; jj++) {
            below.push([a + nums2[jj], i, jj]);
        }
    }
    below.sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
    const result = below.map(([, i, jj]) => [nums1[i], nums2[jj]]);
    // Top up with pairs exactly at the threshold, in (i, j) order — the
    // required tie-break among equal sums.
    let needed = k - result.length;
    for (let i = 0; i < nums1.length && needed > 0; i++) {
        const a = nums1[i];
        const target = threshold - a;
        // First and one-past-last index of target in the sorted nums2.
        let loJ = 0,
            hiJ = nums2.length;
        while (loJ < hiJ) {
            const mid = (loJ + hiJ) >> 1;
            if (nums2[mid] < target) loJ = mid + 1;
            else hiJ = mid;
        }
        let after = loJ;
        hiJ = nums2.length;
        while (after < hiJ) {
            const mid = (after + hiJ) >> 1;
            if (nums2[mid] <= target) after = mid + 1;
            else hiJ = mid;
        }
        for (let jj = loJ; jj < after && needed > 0; jj++) {
            result.push([a, nums2[jj]]);
            needed--;
        }
    }
    return result;
};
