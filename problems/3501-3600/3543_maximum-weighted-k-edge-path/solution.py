from typing import List


class Solution:
    def maxWeight(self, n: int, edges: List[List[int]], k: int, t: int) -> int:
        # Layered bitset DP over path sums: bit s of node v's mask is set
        # iff some path of exactly j edges ends at v with total exactly s
        # (s < t). Weights are >= 1, so a total < t never passes through a
        # prefix >= t, and masking mid-path never drops a valid path.
        full = (1 << t) - 1
        dp = [1] * n  # 0 edges: the empty path (sum 0) sits at every node
        for _ in range(k):
            ndp = [0] * n
            for u, v, w in edges:
                ndp[v] |= (dp[u] << w) & full
            dp = ndp
        best = -1
        for sums in dp:
            if sums:
                best = max(best, sums.bit_length() - 1)
        return best
