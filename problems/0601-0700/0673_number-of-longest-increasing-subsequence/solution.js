/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
    // lengths[i] / counts[i]: the longest strictly increasing subsequence
    // ending at i, and how many of that length end there. A longer
    // predecessor (nums[j] < nums[i]) resets the count to counts[j], an
    // equally long one adds to it, so each i finishes with the total over
    // its best arrivals. The recurrence sums integers, and every count that
    // feeds the returned answer is bounded by the promised 32-bit answer
    // itself, which doubles hold exactly.
    const n = nums.length;
    const lengths = new Array(n).fill(1);
    const counts = new Array(n).fill(1);
    let best = 0;
    let answer = 0;
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < i; ++j) {
            if (nums[j] >= nums[i]) continue;
            const candidate = lengths[j] + 1;
            if (candidate > lengths[i]) {
                lengths[i] = candidate;
                counts[i] = counts[j];
            } else if (candidate === lengths[i]) {
                counts[i] += counts[j];
            }
        }
        if (lengths[i] > best) {
            best = lengths[i];
            answer = counts[i];
        } else if (lengths[i] === best) {
            answer += counts[i];
        }
    }
    return answer;
};
