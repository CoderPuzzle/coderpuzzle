/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
    const mergeCount = (arr) => {
        if (arr.length <= 1) return [arr, 0];
        const mid = Math.floor(arr.length / 2);
        const [left, c1] = mergeCount(arr.slice(0, mid));
        const [right, c2] = mergeCount(arr.slice(mid));
        // Pairs inside either half are already counted; only cross pairs
        // remain, and both halves come back sorted.
        let count = c1 + c2;
        // Count cross reverse pairs left[i] > 2 * right[j]. j never
        // restarts: the next left[i] is at least as large, so every right
        // element already passed also qualifies — the sweep is linear per
        // merge level.
        let j = 0;
        for (let i = 0; i < left.length; i++) {
            while (j < right.length && left[i] > 2 * right[j]) {
                j++;
            }
            count += j;
        }
        const merged = [];
        let i = 0;
        j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                merged.push(left[i]);
                i++;
            } else {
                merged.push(right[j]);
                j++;
            }
        }
        while (i < left.length) merged.push(left[i++]);
        while (j < right.length) merged.push(right[j++]);
        return [merged, count];
    };
    return mergeCount(nums)[1];
};
