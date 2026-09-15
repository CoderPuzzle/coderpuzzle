from typing import List, Optional


class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        durations = [1, 7, 30]
        travel = set(days)
        last = days[-1]
        # dp[d]: cheapest coverage of every travel day up to d.
        dp = [0] * (last + 31)
        for day in range(1, last + 1):
            if day not in travel:
                # No decision on non-travel days; the cost carries forward.
                dp[day] = dp[day - 1]
            else:
                # A pass of duration u ending today covers (day - u, day].
                # max(0, ...) treats dp[0] = 0 as "nothing before day 1".
                dp[day] = min(dp[max(0, day - duration)] + cost for duration, cost in zip(durations, costs))
        return dp[last]
