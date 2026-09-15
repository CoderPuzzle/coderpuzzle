/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
    // Each pair scores its smaller member, so pairing a small value with
    // anything larger sacrifices exactly that small value — the larger
    // partner is pure loss. The smallest element loses in every pairing,
    // so its cheapest partner is the second smallest: re-pairing (a1, x)
    // and (a2, w) into (a1, a2) and (x, w) never lowers the score, since
    // min(x, w) >= a2. Repeating that exchange pairs sorted neighbors,
    // and the score is the even-indexed elements of the ascending array.
    // The comparator is required: the default sort orders strings, which
    // breaks on negative values.
    nums.sort((a, b) => a - b);
    let total = 0;
    // Even indexes hold the smaller member of each adjacent pair.
    for (let index = 0; index < nums.length; index += 2) {
        total += nums[index];
    }
    return total;
};
