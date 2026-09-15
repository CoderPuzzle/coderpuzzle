from typing import List


class Solution:
    def minCost(self, nums: List[int], costs: List[int]) -> int:
        n = len(nums)
        # from any i, jump to the first later j with nums[j] >= nums[i],
        # or the first later j with nums[j] < nums[i]; nothing farther is reachable
        next_ge = [-1] * n
        next_sm = [-1] * n
        stack = []
        for i in range(n):
            while stack and nums[i] >= nums[stack[-1]]:
                # i is exactly the popped index's first >= successor
                next_ge[stack.pop()] = i
            stack.append(i)
        stack = []
        for i in range(n):
            while stack and nums[i] < nums[stack[-1]]:
                # strict < here: plateaus (==) were resolved by the >= stack
                next_sm[stack.pop()] = i
            stack.append(i)
        inf = 10**18
        # dp[i] = min cost to land on i; jumps only go forward, so the graph is a DAG
        dp = [inf] * n
        dp[0] = 0
        # every edge points to a strictly larger index, so one forward sweep
        # visits each node after all of its predecessors
        for i in range(n - 1):
            for j in (next_ge[i], next_sm[i]):
                if j != -1 and dp[i] + costs[j] < dp[j]:
                    dp[j] = dp[i] + costs[j]
        return dp[n - 1]
