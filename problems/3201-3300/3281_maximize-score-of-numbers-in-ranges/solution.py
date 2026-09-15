from typing import List, Optional


class Solution:
    def maxPossibleScore(self, start: List[int], d: int) -> int:
        arr = sorted(start)
        n = len(arr)

        def feasible(x):
            last = arr[0]
            for i in range(1, n):
                chosen = max(arr[i], last + x)
                if chosen > arr[i] + d:
                    return False
                last = chosen
            return True

        lo, hi = 0, arr[-1] + d - arr[0] + 1  # hi is infeasible
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                lo = mid + 1
            else:
                hi = mid
        return lo - 1
