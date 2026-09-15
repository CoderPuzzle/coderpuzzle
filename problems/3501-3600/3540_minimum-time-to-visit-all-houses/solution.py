from typing import List


class Solution:
    def minTotalTime(self, forward: List[int], backward: List[int], queries: List[int]) -> int:
        # Prefix sums over both road sets. Forward distance a -> b walks
        # forward[a..], backward distance a -> b walks backward[a],
        # backward[a-1], ..., i.e. the descending edge weights. Each move
        # takes the cheaper of the two directions. Totals reach 1e5 moves x
        # 1e10 meters, far past 32 bits.
        n = len(forward)
        F = [0] * (n + 1)
        for i, w in enumerate(forward):
            F[i + 1] = F[i] + w
        B = [0] * (n + 1)
        for i, w in enumerate(backward):
            B[i + 1] = B[i] + w
        tf, tb = F[n], B[n]

        def fwd_dist(a: int, b: int) -> int:
            return F[b] - F[a] if a < b else tf - F[a] + F[b]

        def bwd_dist(a: int, b: int) -> int:
            # spends backward[a], backward[a-1], ..., backward[b+1]
            return B[a + 1] - B[b + 1] if a > b else B[a + 1] + tb - B[b + 1]

        ans = 0
        prev = 0
        for q in queries:
            f = fwd_dist(prev, q)
            b = bwd_dist(prev, q)
            ans += f if f < b else b
            prev = q
        return ans
