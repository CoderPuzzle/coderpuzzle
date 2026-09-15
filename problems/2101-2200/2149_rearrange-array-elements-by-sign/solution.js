/**
 * @param {number[]} nums
 * @return {number[]}
 */
var rearrangeArray = function (nums) {
    // Each sign keeps its original relative order, so the k-th positive
    // belongs at slot 2k and the k-th negative at 2k + 1 — one scatter
    // pass places every element directly.
    const result = new Array(nums.length).fill(0);
    let positives = 0;
    let negatives = 0;
    for (const value of nums) {
        if (value > 0) {
            result[2 * positives] = value;
            positives++;
        } else {
            result[2 * negatives + 1] = value;
            negatives++;
        }
    }
    return result;
};
