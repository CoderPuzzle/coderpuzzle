from typing import List, Optional


class Solution:
    def maxPower(self, stations: List[int], r: int, k: int) -> int:
        n = len(stations)
        # power[i] = initial number of power stations serving city i
        diff = [0] * (n + 1)
        for i, s in enumerate(stations):
            left = max(0, i - r)
            right = min(n - 1, i + r)
            diff[left] += s
            diff[right + 1] -= s
        power = []
        cur = 0
        for i in range(n):
            cur += diff[i]
            power.append(cur)

        def feasible(target):
            extra = [0] * (n + 1)
            cur = 0
            used = 0
            for i in range(n):
                cur += extra[i]
                have = power[i] + cur
                if have < target:
                    need = target - have
                    used += need
                    if used > k:
                        return False
                    right = min(n - 1, i + r)
                    extra[right + 1] -= need
                    cur += need
            return used <= k

        # each new station raises any single city's power by at most 1,
        # so the answer never exceeds min(power) + k
        lo, hi = 0, min(power) + k
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
