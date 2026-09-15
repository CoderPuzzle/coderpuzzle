/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var kIncreasing = function (arr, k) {
    const longestNondecreasing = (seq) => {
        // Patience trick: tails[l] is the smallest possible tail of a
        // non-decreasing subsequence of length l+1.
        const tails = [];
        for (const value of seq) {
            // Search for the first tail strictly greater than value — equal
            // elements extend the subsequence instead of replacing, which is
            // what makes it non-decreasing.
            let lo = 0;
            let hi = tails.length;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (tails[mid] <= value) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            if (lo === tails.length) {
                tails.push(value);
            } else {
                tails[lo] = value;
            }
        }
        return tails.length;
    };

    let operations = 0;
    // arr[i-k] <= arr[i] only relates indices congruent mod k, so each
    // residue class is an independent subsequence.
    for (let start = 0; start < k; start++) {
        const sub = [];
        for (let i = start; i < arr.length; i += k) {
            sub.push(arr[i]);
        }
        // Keep the LNDS unchanged and rewrite everything else; values are
        // free, so any kept subsequence can be completed.
        operations += sub.length - longestNondecreasing(sub);
    }
    return operations;
};
