from typing import List, Optional


class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        # Sort the cuts together with the two stick ends: the cutting order is
        # free while the input order is not, and the sentinel endpoints make
        # the outermost segments uniform.
        positions = sorted(cuts + [0, n])
        size = len(positions)
        # dp[i][j]: minimum cost of all cuts strictly between boundaries i and
        # j; adjacent boundaries (no interior cut) stay 0.
        dp = [[0] * size for _ in range(size)]
        # Fill by increasing segment length so both subproblems of an
        # interval are already solved when it needs them.
        for length in range(2, size):
            for i in range(size - length):
                j = i + length
                best = float("inf")
                # Try every interior boundary as the first cut: it splits the
                # segment into independent subproblems and costs the
                # segment's full length.
                for k in range(i + 1, j):
                    if dp[i][k] + dp[k][j] < best:
                        best = dp[i][k] + dp[k][j]
                dp[i][j] = best + (positions[j] - positions[i])
        return dp[0][size - 1]
