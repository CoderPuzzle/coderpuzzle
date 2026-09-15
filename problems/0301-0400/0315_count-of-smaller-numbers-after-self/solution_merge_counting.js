/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
    const n = nums.length;
    const result = new Array(n).fill(0); // per index: strictly smaller values to its right
    const order = [...Array(n).keys()]; // merge-sort workspace of indexes, ordered by value

    const mergeSort = (lo, hi) => {
        if (hi - lo < 2) {
            return;
        }
        const mid = (lo + hi) >> 1;
        mergeSort(lo, mid);
        mergeSort(mid, hi);
        const left = order.slice(lo, mid);
        let i = 0;
        let j = mid;
        let k = lo;
        while (i < left.length && j < hi) {
            if (nums[left[i]] <= nums[order[j]]) {
                // equal: the left element places first, uncounted
                result[left[i]] += j - mid; // right-half values already placed below it
                order[k] = left[i];
                i++;
            } else {
                order[k] = order[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            result[left[i]] += j - mid; // the whole right half sits below it
            order[k] = left[i];
            i++;
            k++;
        }
    };

    mergeSort(0, n);
    return result;
};
