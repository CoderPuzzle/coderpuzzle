/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubsequence = function (nums) {
    // Values fit below 2^30 (nums[i] <= 10^9), so every x >> b is an exact
    // integer shift and every comparison is exact, far inside 2^53. A
    // subsequence ANDs to something non-zero exactly when all of its
    // elements share at least one set bit, so for each bit keep the
    // elements that have it (order preserved) and take the longest
    // strictly increasing subsequence among them; the best bit wins.
    let top = 0;
    for (const x of nums) {
        if (x > top) {
            top = x;
        }
    }
    let best = 0;
    for (let b = 0; top >> b > 0; b++) {
        const tails = [];
        for (const x of nums) {
            if ((x >> b) & 1) {
                // Strictly increasing: replace the first tail >= x.
                let lo = 0;
                let hi = tails.length;
                while (lo < hi) {
                    const mid = (lo + hi) >> 1;
                    if (tails[mid] < x) {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                if (lo === tails.length) {
                    tails.push(x);
                } else {
                    tails[lo] = x;
                }
            }
        }
        if (tails.length > best) {
            best = tails.length;
        }
    }
    return best;
};
