/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @param {number} k
 * @return {number}
 */
var minimumCost = function (nums, cost, k) {
    const n = nums.length;
    const prefNums = new Array(n + 1).fill(0);
    const prefCost = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefNums[i + 1] = prefNums[i] + nums[i];
        prefCost[i + 1] = prefCost[i] + cost[i];
    }

    const INF = Infinity;
    // dp[i] = min cost to partition the suffix nums[i:]; empty suffix is free.
    const dp = new Array(n + 1).fill(INF);
    dp[n] = 0;
    const totalCost = prefCost[n];
    // Right-to-left so every suffix value dp[j+1] is ready when needed.
    for (let i = n - 1; i >= 0; i--) {
        let best = INF;
        // Take [i, j] as the first block. The k*index term telescopes: each
        // block is charged k * (cost mass from i to the array's end), a
        // self-contained penalty independent of later split choices.
        for (let j = i; j < n; j++) {
            // prefNums[j+1] is the whole-array prefix through j, matching the
            // nums[0..r] factor of the formula, not the block's own sum.
            let seg = prefNums[j + 1] * (prefCost[j + 1] - prefCost[i]);
            seg += k * (totalCost - prefCost[i]);
            const cand = seg + dp[j + 1];
            if (cand < best) {
                best = cand;
            }
        }
        dp[i] = best;
    }
    return dp[0];
};
