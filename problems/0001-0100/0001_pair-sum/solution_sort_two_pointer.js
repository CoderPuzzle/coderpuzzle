/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var pairSum = function (nums, target) {
    // Order the positions by their values: the pair hunt can then run as
    // a converging scan, while each position rides along with its value.
    const order = nums.map((_, position) => position).sort((a, b) => nums[a] - nums[b]);
    // Converging pointers over that order. A too-small total can only be
    // raised by advancing low; a too-large one only lowered by retreating
    // high -- each step retires one position as a possible member.
    let low = 0;
    let high = order.length - 1;
    while (low < high) {
        const total = nums[order[low]] + nums[order[high]];
        if (total === target) {
            // The positions come out in value order; either ordering of
            // the two is accepted.
            return [order[low], order[high]];
        }
        if (total < target) {
            low++;
        } else {
            high--;
        }
    }
    // Statement promises a solution exists; empty is just the fallback.
    return [];
};
