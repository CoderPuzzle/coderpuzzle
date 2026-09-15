from typing import List


class Solution:
    def maxTurbulenceSize(self, arr: List[int]) -> int:
        # Single sweep with a running sign state: a comparison that flips
        # the previous sign extends the turbulent run, a repeat or an
        # equal pair restarts it at the appropriate short length.
        best = 1
        run = 1
        prev_sign = 0  # sign of the previous comparison: -1, 0, or 1
        for i in range(1, len(arr)):
            if arr[i] > arr[i - 1]:
                sign = 1
            elif arr[i] < arr[i - 1]:
                sign = -1
            else:
                sign = 0
            if sign == 0:
                run = 1
            elif sign == -prev_sign:
                run += 1
            else:
                run = 2
            prev_sign = sign
            # A run only reaches its full length at its last element, so
            # tracking the best while it grows misses nothing.
            best = max(best, run)
        return best
