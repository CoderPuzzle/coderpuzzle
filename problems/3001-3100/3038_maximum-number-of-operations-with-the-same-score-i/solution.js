/**
 * @param {number[]} nums
 * @return {number}
 */
var maxOperations = function (nums) {
    // The first operation is forced: its score fixes the target sum
    // every later operation must repeat.
    const score = nums[0] + nums[1];
    let operations = 1;
    // Greedily consume consecutive pairs while each sums to that score;
    // the first mismatch (or a lone leftover element) ends the run.
    for (let i = 2; i + 1 < nums.length; i += 2) {
        if (nums[i] + nums[i + 1] !== score) {
            break;
        }
        operations++;
    }
    return operations;
};
