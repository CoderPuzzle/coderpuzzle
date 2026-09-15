from typing import List


class Solution:
    def maxCount(self, banned: List[int], n: int, maxSum: int) -> int:
        # Smallest-first greedy computed gap by gap over the sorted,
        # de-duplicated bans: a free run of `avail` candidates starting
        # at `lo` costs avail*(2*lo+avail-1)/2 when swallowed whole. The
        # first run that cannot fit contains the answer's cutoff — every
        # later candidate is larger — so exactly one binary search caps
        # it and the walk stops there. The count stays <= sqrt(2*10^15)
        # ~ 4.5e7, far below 2^31; running products stay near 3*10^18,
        # which fits Python's exact integers (and 64-bit ints elsewhere).
        def ladder(lo, cnt):
            return cnt * (2 * lo + cnt - 1) // 2

        def best_prefix(lo, avail):
            low, high = 0, avail
            while low < high:
                mid = (low + high + 1) >> 1
                if ladder(lo, mid) <= maxSum:
                    low = mid
                else:
                    high = mid - 1
            return low

        taken = 0
        prev = 0
        finished = False
        for value in sorted(set(banned)):
            avail = value - prev - 1
            if avail > 0:
                lo = prev + 1
                cost = ladder(lo, avail)
                if cost <= maxSum:
                    taken += avail
                    maxSum -= cost
                else:
                    taken += best_prefix(lo, avail)
                    finished = True
                    break
            prev = value
        if not finished and n > prev:
            lo = prev + 1
            avail = n - prev
            cost = ladder(lo, avail)
            if cost <= maxSum:
                taken += avail
            else:
                taken += best_prefix(lo, avail)
        return taken
