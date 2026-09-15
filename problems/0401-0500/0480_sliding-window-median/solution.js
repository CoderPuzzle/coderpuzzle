/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var medianSlidingWindow = function (nums, k) {
    // One sorted array mirrors the window: binary insertion keeps it sorted
    // without ever re-sorting a whole window.
    const window = [];
    const out = [];
    const lowerBound = (arr, target) => {
        let lo = 0,
            hi = arr.length;
        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    for (let i = 0; i < nums.length; i++) {
        window.splice(lowerBound(window, nums[i]), 0, nums[i]);
        // Evict the leftmost occurrence of the outgoing value — equal
        // elements are interchangeable, so the multiset stays exact.
        if (i >= k) {
            window.splice(lowerBound(window, nums[i - k]), 1);
        }
        // Eviction already ran, so exactly k values are present here; the
        // median is then a plain index lookup (middle pair for even k).
        if (i >= k - 1) {
            if (k % 2 === 1) {
                out.push(window[Math.floor(k / 2)]);
            } else {
                out.push((window[k / 2 - 1] + window[k / 2]) / 2.0);
            }
        }
    }
    return out;
};
