from typing import List, Optional


class Solution:
    def maxProfit(self, n: int, edges: List[List[int]], score: List[int]) -> int:
        # Fast path: no edges (and no negative scores, so the -1 sentinel can
        # never collide) -> free assignment; pair ascending scores with
        # ascending positions (rearrangement inequality).
        if not edges and min(score) >= 0:
            return sum(v * (i + 1) for i, v in enumerate(sorted(score)))

        pred = [0] * n
        for u, v in edges:
            pred[v] |= 1 << u

        full = (1 << n) - 1
        neg = -1
        dp = [neg] * (1 << n)
        dp[0] = 0

        for mask in range(1 << n):
            cur = dp[mask]
            if cur < 0:
                continue
            pos = bin(mask).count("1") + 1
            remaining = full ^ mask
            while remaining:
                bit = remaining & -remaining
                node = bit.bit_length() - 1
                if pred[node] & mask == pred[node]:
                    nm = mask | bit
                    val = cur + score[node] * pos
                    if val > dp[nm]:
                        dp[nm] = val
                remaining -= bit
        return dp[full]
