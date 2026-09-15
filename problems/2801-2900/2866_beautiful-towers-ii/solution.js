/**
 * Runs one monotonic-index sweep per side: popping every strictly taller
 * index before i leaves j, the nearest index with maxHeights[j] <=
 * maxHeights[i]; towers j+1..i clip to the peak height while the prefix up
 * to j keeps its own best mountain, so
 * left[i] = left[j] + maxHeights[i] * (i - j). Sums reach
 * n * max(maxHeights[i]) = 10^5 * 10^9 = 10^14 < 2^53, so every value
 * stays an exact double.
 * @param {number[]} maxHeights
 * @return {number}
 */
var maximumSumOfHeights = function (maxHeights) {
    const n = maxHeights.length;
    const left = new Array(n);
    const right = new Array(n);
    let stack = [];
    for (let i = 0; i < n; ++i) {
        const h = maxHeights[i];
        while (stack.length && maxHeights[stack[stack.length - 1]] > h) {
            stack.pop();
        }
        const j = stack[stack.length - 1];
        left[i] = j === undefined ? h * (i + 1) : left[j] + h * (i - j);
        stack.push(i);
    }
    stack = [];
    for (let i = n - 1; i >= 0; --i) {
        const h = maxHeights[i];
        while (stack.length && maxHeights[stack[stack.length - 1]] > h) {
            stack.pop();
        }
        const j = stack[stack.length - 1];
        right[i] = j === undefined ? h * (n - i) : right[j] + h * (j - i);
        stack.push(i);
    }
    let best = 0;
    for (let i = 0; i < n; ++i) {
        best = Math.max(best, left[i] + right[i] - maxHeights[i]);
    }
    return best;
};
