/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmallerOppositeParity = function (nums) {
    const n = nums.length;
    const result = new Array(n).fill(0); // per index: smaller opposite-parity values to its right
    const order = [...Array(n).keys()]; // merge-sort workspace of indexes, ordered by value

    const mergeSort = (lo, hi) => {
        if (hi - lo < 2) {
            return;
        }
        const mid = (lo + hi) >> 1;
        mergeSort(lo, mid);
        mergeSort(mid, hi);
        const left = order.slice(lo, mid);
        const placed = [0, 0]; // placed right-half values, split by parity
        let i = 0;
        let j = mid;
        let k = lo;
        while (i < left.length && j < hi) {
            if (nums[left[i]] <= nums[order[j]]) {
                // equal: the left element places first, uncounted
                result[left[i]] += placed[1 - (nums[left[i]] & 1)]; // opposite parity only
                order[k] = left[i];
                i++;
            } else {
                placed[nums[order[j]] & 1]++;
                order[k] = order[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            // every placed right-half value sits below the remaining left run
            result[left[i]] += placed[1 - (nums[left[i]] & 1)];
            order[k] = left[i];
            i++;
            k++;
        }
    };

    mergeSort(0, n);
    return result;
};
