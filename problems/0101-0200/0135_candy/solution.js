/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
    const n = ratings.length;
    // One candy per child is the minimum allowed.
    const candies = new Array(n).fill(1);
    // Left-to-right: enforce the left-neighbor rule with the smallest value
    // exceeding the left neighbor's allotment.
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    // Right-to-left: enforce the right-neighbor rule symmetrically. The max
    // only raises a count, never lowers it, so these fixes cannot undo the
    // first pass's left-neighbor guarantees.
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    let total = 0;
    for (const value of candies) {
        total += value;
    }
    return total;
};
