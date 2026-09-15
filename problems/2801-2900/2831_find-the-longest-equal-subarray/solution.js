/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestEqualSubarray = function (nums, k) {
    const positionsByValue = new Map();
    for (let i = 0; i < nums.length; i++) {
        const list = positionsByValue.get(nums[i]);
        if (list === undefined) {
            positionsByValue.set(nums[i], [i]);
        } else {
            list.push(i);
        }
    }
    let answer = 0;
    for (const positions of positionsByValue.values()) {
        let left = 0;
        for (let right = 0; right < positions.length; right++) {
            // Span length minus kept copies is the deletion cost.
            while (positions[right] - positions[left] - (right - left) > k) {
                left++;
            }
            answer = Math.max(answer, right - left + 1);
        }
    }
    return answer;
};
