/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var anagramMappings = function (nums1, nums2) {
    // Each element of nums1 must land on an index of nums2 that holds
    // the same value, and with repeats no index can serve two elements.
    // One pass files every value's indices in nums2 into a queue, left
    // to right; the second walk hands each element of nums1 the front
    // of its queue and pops it, so every copy takes the leftmost
    // position not claimed by an earlier copy.
    const positions = new Map();
    for (let index = 0; index < nums2.length; ++index) {
        const value = nums2[index];
        const queue = positions.get(value) ?? [];
        queue.push(index);
        positions.set(value, queue);
    }
    const mapping = [];
    for (const value of nums1) {
        const queue = positions.get(value);
        if (queue !== undefined && queue.length > 0) {
            const front = queue.shift();
            if (front !== undefined) {
                mapping.push(front);
            }
        }
    }
    return mapping;
};
