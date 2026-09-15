from typing import List, Optional


class Solution:
    def minimumMoves(self, nums: List[int], k: int, maxChanges: int) -> int:
        ones = [0]  # 1-indexed positions of ones
        prefix = [0]
        for i, value in enumerate(nums):
            if value:
                ones.append(i)
                prefix.append(prefix[-1] + i)
        m = len(ones) - 1
        INF = float("inf")

        def window_cost(t):
            # min cost of gathering t real ones at one position
            if t == 0:
                return 0
            if t > m:
                return INF
            best = INF
            for l in range(1, m - t + 2):
                r = l + t - 1
                pos = (l + r) // 2
                left_cnt = pos - l
                right_cnt = r - pos
                left = left_cnt * ones[pos] - (prefix[pos - 1] - prefix[l - 1])
                right = (prefix[r] - prefix[pos]) - right_cnt * ones[pos]
                cost = left + right
                if cost < best:
                    best = cost
            return best

        def total(t):
            wc = window_cost(t)
            if wc == INF:
                return INF
            return wc + 2 * (k - t)

        lo = max(0, k - maxChanges)
        hi = min(k, m)
        if lo > hi:  # unreachable given maxChanges + sum(nums) >= k
            return 0
        while hi - lo > 4:
            m1 = lo + (hi - lo) // 3
            m2 = hi - (hi - lo) // 3
            if total(m1) <= total(m2):
                hi = m2
            else:
                lo = m1
        return min(total(t) for t in range(lo, hi + 1))
