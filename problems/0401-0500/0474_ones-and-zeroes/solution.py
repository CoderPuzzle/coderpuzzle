from typing import List, Optional


class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        # dp[i][j] = most strings pickable with at most i zeros and j ones:
        # a 0/1 knapsack with two resource axes; the all-zero table already
        # encodes "pick nothing".
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for s in strs:
            # Only the string's shape matters: its 0-count and 1-count.
            zeros = s.count("0")
            ones = len(s) - zeros
            # Budgets iterate downward so every read sees values from before
            # this string's pass — enforcing 0/1 (once-per-string) use.
            for i in range(m, zeros - 1, -1):
                # i only decreases, so row i - zeros is never stale.
                row = dp[i]
                prev = dp[i - zeros]
                for j in range(n, ones - 1, -1):
                    # Take-or-skip: taking is optional when it doesn't pay.
                    cand = prev[j - ones] + 1
                    if cand > row[j]:
                        row[j] = cand
        return dp[m][n]
