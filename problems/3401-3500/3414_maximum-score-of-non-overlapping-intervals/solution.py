from bisect import bisect_left
from typing import List


class Solution:
    def maximumWeight(self, intervals: List[List[int]]) -> List[int]:
        n = len(intervals)
        # Sort by right endpoint: every pick set is a chain in this order,
        # and sharing any point (even one boundary) means overlapping, so
        # predecessors must end strictly left of the current left end.
        order = sorted(range(n), key=lambda t: (intervals[t][1], intervals[t][0]))
        rights = [intervals[t][1] for t in order]

        neg = -(1 << 62)
        # dp[k][i] = (best score, lexicographically smallest ascending index
        # tuple) picking exactly k intervals among the first i sorted ones.
        dp = [[(0, ())] * (n + 1) for _ in range(5)]
        for k in range(1, 5):
            for i in range(1, n + 1):
                best = dp[k][i - 1]
                idx = order[i - 1]
                left, _, weight = intervals[idx]
                prev_score, prev_arr = dp[k - 1][bisect_left(rights, left)]
                if prev_score > neg // 2:
                    arr = list(prev_arr)
                    pos = len(arr)
                    while pos > 0 and arr[pos - 1] > idx:
                        pos -= 1
                    arr.insert(pos, idx)
                    # Score first; on a tie the smaller index tuple wins.
                    if prev_score + weight > best[0] or (prev_score + weight == best[0] and tuple(arr) < best[1]):
                        best = (prev_score + weight, tuple(arr))
                dp[k][i] = best

        top = max(dp[k][n][0] for k in range(1, 5))
        return list(min(dp[k][n][1] for k in range(1, 5) if dp[k][n][0] == top))
