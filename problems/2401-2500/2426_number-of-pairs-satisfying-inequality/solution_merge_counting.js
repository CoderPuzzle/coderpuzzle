/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} diff
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, diff) {
    const n = nums1.length;
    const values = new Array(n);
    for (let i = 0; i < n; i++) {
        values[i] = nums1[i] - nums2[i];
    }
    const mergeSort = (lo, hi) => {
        if (hi - lo < 2) {
            return 0;
        }
        const mid = (lo + hi) >> 1;
        let count = mergeSort(lo, mid) + mergeSort(mid, hi);
        const left = values.slice(lo, mid);
        let p = 0; // left values at or below the running bound
        for (let j = mid; j < hi; j++) {
            while (p < left.length && left[p] <= values[j] + diff) {
                p++;
            }
            count += p; // each admitted left value pairs with this right element
        }
        let i = 0;
        let j = mid;
        let k = lo;
        while (i < left.length && j < hi) {
            if (left[i] <= values[j]) {
                // equal: the left element places first
                values[k] = left[i];
                i++;
            } else {
                values[k] = values[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            values[k] = left[i];
            i++;
            k++;
        }
        return count;
    };
    return mergeSort(0, n);
};
