class Solution {
  public:
    long long minCost(vector<int> &nums, vector<int> &costs) {
        int n = (int)nums.size();
        // from any i, jump to the first later j with nums[j] >= nums[i],
        // or the first later j with nums[j] < nums[i]; nothing farther is reachable
        vector<int> nextGe(n, -1), nextSm(n, -1);
        vector<int> stack;
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && nums[i] >= nums[stack.back()]) {
                // i is exactly the popped index's first >= successor
                nextGe[stack.back()] = i;
                stack.pop_back();
            }
            stack.push_back(i);
        }
        stack.clear();
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && nums[i] < nums[stack.back()]) {
                // strict < here: plateaus (==) were resolved by the >= stack
                nextSm[stack.back()] = i;
                stack.pop_back();
            }
            stack.push_back(i);
        }
        long long inf = (long long)1e18;
        // dp[i] = min cost to land on i; jumps only go forward, so the graph is a DAG
        vector<long long> dp(n, inf);
        dp[0] = 0;
        // every edge points to a strictly larger index, so one forward sweep
        // visits each node after all of its predecessors
        for (int i = 0; i + 1 < n; i++) {
            for (int j : {nextGe[i], nextSm[i]}) {
                if (j != -1 && dp[i] + costs[j] < dp[j]) {
                    dp[j] = dp[i] + costs[j];
                }
            }
        }
        return dp[n - 1];
    }
};
