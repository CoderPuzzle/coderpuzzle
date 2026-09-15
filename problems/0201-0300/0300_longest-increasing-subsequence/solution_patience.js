/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    // tails[k] = smallest value ending an increasing subsequence of
    // length k+1; it stays sorted, which licenses the binary search.
    const tails = [];
    for (const x of nums) {
        // Lower bound: first tail >= x. An equal value lands on its
        // own tail, which enforces strict increase.
        let lo = 0,
            hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        // Past the end: x beats every tail, so extend by one;
        // otherwise replace — same length, cheaper ending.
        if (lo === tails.length) tails.push(x);
        else tails[lo] = x;
    }
    // tails itself need not be a real subsequence; only its length is.
    return tails.length;
};
