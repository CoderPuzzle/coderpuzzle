/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minLength = function (nums, k) {
    // One pass, right end expanding: freq counts each value inside the
    // window and distinctSum tracks the sum of the distinct values
    // present — a value joins the sum when its first copy enters and
    // leaves it when its last copy departs.
    const freq = new Map();
    let distinctSum = 0;
    let best = -1;
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        const num = nums[right];
        const count = (freq.get(num) ?? 0) + 1;
        freq.set(num, count);
        if (count === 1) {
            distinctSum += num;
        }
        // Shrink from the left while the window stays qualified; every
        // prefix of a kept window is dropped only after recording it.
        while (distinctSum >= k && left <= right) {
            const length = right - left + 1;
            if (best === -1 || length < best) {
                best = length;
            }
            const out = nums[left];
            if (freq.get(out) === 1) {
                distinctSum -= out;
            }
            freq.set(out, freq.get(out) - 1);
            left++;
        }
    }
    return best;
};
