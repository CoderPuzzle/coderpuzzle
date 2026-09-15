from typing import List


class Solution:
    def minTravelTime(self, l: int, n: int, k: int, position: List[int], time: List[int]) -> int:
        INF = float("inf")
        # prefix[t] = sum of time[0..t-1]; merging a run of s removals that
        # sit directly before kept sign i folds time[i-s..i] into its rate.
        prefix = [0] * (n + 1)
        for i, value in enumerate(time):
            prefix[i + 1] = prefix[i] + value
        # dp[i][j][s]: sign i kept, j merges spent, s consecutive removals
        # directly before i; the outgoing segment (i -> next kept) is charged
        # when the transition is relaxed.
        dp = [[[INF] * (k + 1) for _ in range(k + 1)] for _ in range(n)]
        dp[0][0][0] = 0
        for i in range(n):
            for j in range(k + 1):
                for s in range(k + 1):
                    base = dp[i][j][s]
                    if base == INF:
                        continue
                    rate = prefix[i + 1] - prefix[i - s]
                    for q in range(i + 1, n):
                        d = q - i - 1
                        if j + d > k:
                            break
                        cost = base + (position[q] - position[i]) * rate
                        if cost < dp[q][j + d][d]:
                            dp[q][j + d][d] = cost
        return min(dp[n - 1][k][s] for s in range(k + 1))
