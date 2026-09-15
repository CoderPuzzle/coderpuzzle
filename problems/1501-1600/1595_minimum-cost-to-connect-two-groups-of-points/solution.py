from typing import List

INF = 1_000_000


class Solution:
    def connectTwoGroups(self, cost: List[List[int]]) -> int:
        size1, size2 = len(cost), len(cost[0])
        full = 1 << size2
        # min_to_reach[j]: cheapest single edge that reaches second-group
        # point j from ANY first-group point, used to force coverage of
        # whichever second-group points the forward pass leaves untouched.
        min_to_reach = [min(cost[i][j] for i in range(size1)) for j in range(size2)]

        # dp[mask]: cheapest way to finish connecting everything once the
        # first-group points placed so far have reached exactly `mask`.
        # Seed with i == size1: no first-group points remain to place, so
        # every second-group point missing from mask must be force-connected
        # at its own cheapest edge.
        dp = [sum(min_to_reach[j] for j in range(size2) if not (mask >> j) & 1) for mask in range(full)]

        for i in range(size1 - 1, -1, -1):
            next_dp = [INF] * full
            for mask in range(full):
                for j in range(size2):
                    candidate = cost[i][j] + dp[mask | (1 << j)]
                    if candidate < next_dp[mask]:
                        next_dp[mask] = candidate
            dp = next_dp

        return dp[0]
