from typing import List, Optional


class Solution:
    def maximizeTheProfit(self, n: int, offers: List[List[int]]) -> int:
        # Non-overlapping offers make this weighted interval scheduling on a
        # line. Bucket offers by end house — the bucket array itself provides
        # ordering by end position, so no sorting is needed.
        by_end = [[] for _ in range(n)]
        for start, end, gold in offers:
            by_end[end].append((start, gold))
        # dp[e + 1]: best gold from houses 0..e. Either house e stays unsold
        # (carry dp[e] forward) or some offer [start, e, gold] is sold on top
        # of the optimum strictly before its start — reading dp[start] is
        # what keeps overlapping offers from being combined.
        dp = [0] * (n + 1)
        for end in range(n):
            dp[end + 1] = dp[end]
            for start, gold in by_end[end]:
                cand = dp[start] + gold
                if cand > dp[end + 1]:
                    dp[end + 1] = cand
        return dp[n]
