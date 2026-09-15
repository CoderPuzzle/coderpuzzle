/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @return {number[]}
 */
var twoOutOfThree = function (nums1, nums2, nums3) {
    const masks = new Array(101).fill(0);
    for (const [index, nums] of [nums1, nums2, nums3].entries()) {
        const bit = 1 << index;
        for (const value of nums) {
            masks[value] |= bit;
        }
    }

    const answer = [];
    for (let value = 1; value <= 100; ++value) {
        const mask = masks[value];
        if ((mask & (mask - 1)) !== 0) {
            answer.push(value);
        }
    }
    return answer;
};
