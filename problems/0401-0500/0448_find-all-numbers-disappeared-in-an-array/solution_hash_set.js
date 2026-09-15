/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
    // The direct reading: record every value in a hash set, then walk the
    // candidate range 1..n and keep the values the set does not hold.
    // Repeats are harmless: a value already present overwrites its own
    // entry, so the set ends holding exactly the distinct values.
    const seen = new Set(nums);
    // The set carries no order of its own; walking the candidates in
    // increasing order is what makes the pinned ascending output free.
    const disappeared = [];
    for (let value = 1; value <= nums.length; ++value) {
        if (!seen.has(value)) {
            disappeared.push(value);
        }
    }
    return disappeared;
};
