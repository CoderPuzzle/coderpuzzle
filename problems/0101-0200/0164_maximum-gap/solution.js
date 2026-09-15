/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function (nums) {
    if (nums.length < 2) {
        // No pair of successive elements exists.
        return 0;
    }
    let lo = nums[0];
    let hi = nums[0];
    for (const value of nums) {
        lo = Math.min(lo, value);
        hi = Math.max(hi, value);
    }
    if (lo === hi) {
        // Equal extremes mean every value is identical: all gaps are 0.
        return 0;
    }
    const count = nums.length - 1;
    // Bucket width ceil(span/count): the average sorted gap is
    // span/count, so the maximum gap — an integer — is at least this
    // wide, and no gap inside a single bucket (spread <= width - 1)
    // can be the answer.
    const width = Math.ceil((hi - lo) / count);
    const bucketMin = new Array(count + 1).fill(null);
    const bucketMax = new Array(count + 1).fill(null);
    for (const value of nums) {
        // Pure division into [lo, hi] — lo lands in bucket 0, hi in
        // bucket count at most, and no multiplication can overflow.
        const index = Math.floor((value - lo) / width);
        if (bucketMin[index] === null || value < bucketMin[index]) {
            bucketMin[index] = value;
        }
        if (bucketMax[index] === null || value > bucketMax[index]) {
            bucketMax[index] = value;
        }
    }
    let best = 0;
    // Bucket 0 holds lo, so it is never empty.
    let previousMax = bucketMax[0];
    for (let index = 1; index <= count; ++index) {
        if (bucketMin[index] === null) {
            // Empty bucket: the measured jump only grows wider, and
            // the neighbours are successive in sorted order.
            continue;
        }
        best = Math.max(best, bucketMin[index] - previousMax);
        previousMax = bucketMax[index];
    }
    return best;
};
