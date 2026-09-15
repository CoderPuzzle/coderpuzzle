/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var goodTriplets = function (nums1, nums2) {
    const n = nums1.length;
    const pos2 = new Array(n);
    for (let i = 0; i < n; i++) {
        pos2[nums2[i]] = i;
    }
    const a = new Array(n); // a[i] = position of nums1[i] in nums2
    for (let i = 0; i < n; i++) {
        a[i] = pos2[nums1[i]];
    }

    const smallerAfter = new Array(n).fill(0); // per index: later nums1 values that precede it in nums2
    const order = [...Array(n).keys()]; // merge-sort workspace of indexes, ordered by nums2 position

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
            if (a[left[i]] < a[order[j]]) {
                smallerAfter[left[i]] += j - mid; // right-half values already placed below it
                order[k] = left[i];
                i++;
            } else {
                order[k] = order[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            smallerAfter[left[i]] += j - mid; // the whole right half sits below it
            order[k] = left[i];
            i++;
            k++;
        }
    };

    mergeSort(0, n);

    let answer = 0;
    for (let i = 0; i < n; i++) {
        const left = a[i] - smallerAfter[i]; // values before value in nums1 and in nums2
        // values after value in both arrays
        const right = n - 1 - i - smallerAfter[i];
        answer += left * right;
    }
    return answer;
};
