/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function (nums, k) {
    let result = 0;
    let cnt = 0;
    const dq = [];
    let head = 0; // front index into dq
    let right = nums.length - 1;
    for (let left = nums.length - 1; left >= 0; left--) {
        // Merge stack segments: raise smaller elements to nums[left].
        while (head < dq.length && nums[dq[dq.length - 1]] < nums[left]) {
            const l = dq.pop();
            const r = head < dq.length ? dq[dq.length - 1] - 1 : right;
            cnt += (r - l + 1) * (nums[left] - nums[l]);
        }
        dq.push(left);
        // Shrink the window from the right if the cost exceeds k.
        while (cnt > k) {
            cnt -= nums[dq[head]] - nums[right];
            if (dq[head] === right) head++;
            right--;
        }
        result += right - left + 1;
    }
    return result;
};
