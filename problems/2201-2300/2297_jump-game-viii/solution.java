import java.util.*;

class Solution {

    public long minCost(int[] nums, int[] costs) {
        int n = nums.length;
        // from any i, jump to the first later j with nums[j] >= nums[i],
        // or the first later j with nums[j] < nums[i]; nothing farther is reachable
        int[] nextGe = new int[n];
        int[] nextSm = new int[n];
        Arrays.fill(nextGe, -1);
        Arrays.fill(nextSm, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && nums[i] >= nums[stack.peek()]) {
                // i is exactly the popped index's first >= successor
                nextGe[stack.pop()] = i;
            }
            stack.push(i);
        }
        stack.clear();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && nums[i] < nums[stack.peek()]) {
                // strict < here: plateaus (==) were resolved by the >= stack
                nextSm[stack.pop()] = i;
            }
            stack.push(i);
        }
        long inf = (long) 1e18;
        // dp[i] = min cost to land on i; jumps only go forward, so the graph is a DAG
        long[] dp = new long[n];
        Arrays.fill(dp, inf);
        dp[0] = 0;
        // every edge points to a strictly larger index, so one forward sweep
        // visits each node after all of its predecessors
        for (int i = 0; i + 1 < n; i++) {
            for (int j : new int[] { nextGe[i], nextSm[i] }) {
                if (j != -1 && dp[i] + costs[j] < dp[j]) {
                    dp[j] = dp[i] + costs[j];
                }
            }
        }
        return dp[n - 1];
    }
}
