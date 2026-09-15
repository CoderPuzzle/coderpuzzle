from typing import List


class Solution:
    def maximizeWin(self, prizePositions: List[int], k: int) -> int:
        # One window at a time first: a running two-pointer per direction
        # yields prefix-best[c] (best single k-window over indices < c)
        # and suffix-best[c] (over indices >= c). Any optimal pair splits
        # across some index cut with each side's take bounded by its own
        # single best, and both bests are simultaneously placeable, so
        # maximizing prefix[c] + suffix[c] over all cuts is exact.
        pp = prizePositions
        n = len(pp)
        pre = [0] * (n + 1)
        s = 0
        mx = 0
        for t in range(n):
            while pp[t] - pp[s] > k:
                s += 1
            if t - s + 1 > mx:
                mx = t - s + 1
            pre[t + 1] = mx
        suf = [0] * (n + 1)
        g = n - 1
        mx = 0
        for e in range(n - 1, -1, -1):
            while pp[g] - pp[e] > k:
                g -= 1
            if g - e + 1 > mx:
                mx = g - e + 1
            suf[e] = mx
        ans = 0
        for c in range(n + 1):
            if pre[c] + suf[c] > ans:
                ans = pre[c] + suf[c]
        return ans
