from typing import List


class Solution:
    def minSideJumps(self, obstacles: List[int]) -> int:
        # dp[lane] = fewest side jumps needed to stand on that lane at the
        # point being processed. Forward moves are free, a lane change is
        # one jump, so each new point relaxes every open lane against the
        # previous point's cheapest lane plus one.
        INF = 10**9
        dp = [INF, 1, 0, 1]  # lanes indexed 1..3; the frog starts on lane 2
        for point in range(1, len(obstacles)):
            blocked = obstacles[point]
            dp[blocked] = INF
            best = min(dp[1], dp[2], dp[3])
            for lane in (1, 2, 3):
                if lane != blocked:
                    dp[lane] = min(dp[lane], best + 1)
        return min(dp[1], dp[2], dp[3])
