/**
 * @param {number[]} nums
 * @param {number[]} costs
 * @return {number}
 */
var minCost = function (nums, costs) {
    const n = nums.length;
    // from any i, jump to the first later j with nums[j] >= nums[i],
    // or the first later j with nums[j] < nums[i]; nothing farther is reachable
    const nextGe = new Array(n).fill(-1);
    const nextSm = new Array(n).fill(-1);
    let stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[i] >= nums[stack[stack.length - 1]]) {
            // i is exactly the popped index's first >= successor
            nextGe[stack.pop()] = i;
        }
        stack.push(i);
    }
    stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
            // strict < here: plateaus (==) were resolved by the >= stack
            nextSm[stack.pop()] = i;
        }
        stack.push(i);
    }
    const inf = Infinity;
    // dp[i] = min cost to land on i; jumps only go forward, so the graph is a DAG
    const dp = new Array(n).fill(inf);
    dp[0] = 0;
    // every edge points to a strictly larger index, so one forward sweep
    // visits each node after all of its predecessors
    for (let i = 0; i + 1 < n; i++) {
        for (const j of [nextGe[i], nextSm[i]]) {
            if (j !== -1 && dp[i] + costs[j] < dp[j]) {
                dp[j] = dp[i] + costs[j];
            }
        }
    }
    return dp[n - 1];
};
