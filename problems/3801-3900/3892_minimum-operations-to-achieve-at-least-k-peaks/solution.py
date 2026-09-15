from typing import List, Optional


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        # A peak's two neighbours (circular) can never themselves be peaks, so
        # they keep their original values and making position i a peak costs
        # max(0, max(prev, nxt) + 1 - nums[i]) with original neighbour values.
        n = len(nums)
        if k == 0:
            return 0
        if k > n // 2:
            return -1  # a circle admits at most floor(n/2) strict peaks
        INF = 10**15
        c = [0] * n
        for i in range(1, n):
            prev = nums[i - 1] if i >= 2 else nums[0]
            nxt = nums[i + 1] if i <= n - 2 else nums[0]
            c[i] = max(0, max(prev, nxt) + 1 - nums[i])

        def linear(cap, force_start, force_end):
            # Capped knapsack over positions 1..n-1. not_peak[j] / peak[j] are
            # the cheapest ways to reach j peaks (j == cap means "at least cap")
            # with the current position left unpicked / picked.
            not_peak = [INF] * (cap + 1)
            peak = [INF] * (cap + 1)
            not_peak[0] = 0
            if not force_start and cap >= 1:
                peak[1] = c[1]
            for i in range(2, n):
                new_not = [min(a, b) for a, b in zip(not_peak, peak)]
                new_peak = [INF] * (cap + 1)
                # A peak needs the previous position unpicked; over cap, extra
                # peaks stay folded into the top cell.
                if not (i == n - 1 and force_end):
                    base = c[i]
                    for j in range(1, cap):
                        v = not_peak[j - 1]
                        if v < INF:
                            new_peak[j] = v + base
                    if cap >= 1:
                        v = not_peak[cap - 1]
                        if not_peak[cap] < v:
                            v = not_peak[cap]
                        if v < INF:
                            new_peak[cap] = v + base
                not_peak, peak = new_not, new_peak
            return min(not_peak[cap], peak[cap])

        # Case A: index 0 is a peak, so positions 1 and n-1 cannot be peaks.
        cost0 = max(0, max(nums[n - 1], nums[1]) + 1 - nums[0])
        ans_a = cost0 + linear(max(0, k - 1), True, True)
        # Case B: index 0 stays unpicked; all other positions are free.
        ans_b = linear(k, False, False)
        ans = min(ans_a, ans_b)
        return -1 if ans >= INF else ans
