/**
 * @param {number[]} arr
 * @return {number}
 */
var longestMountain = function (arr) {
    // One pass over the peaks: an index is a peak when it strictly
    // beats both neighbors; expand each slope while it stays strict.
    const n = arr.length;
    let best = 0;
    let i = 1;
    while (i < n - 1) {
        if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
            let left = i - 1;
            // Walk down the ascent while it keeps rising strictly.
            while (left > 0 && arr[left - 1] < arr[left]) {
                --left;
            }
            let right = i + 1;
            // Walk down the descent while it keeps falling strictly.
            while (right < n - 1 && arr[right] > arr[right + 1]) {
                ++right;
            }
            best = Math.max(best, right - left + 1);
            // The next peak lies strictly past this descent's floor.
            i = right + 1;
        } else {
            ++i;
        }
    }
    return best;
};
