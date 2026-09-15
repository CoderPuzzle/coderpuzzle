from typing import List


class Solution:
    def minOperations(self, nums: List[int], x: int, y: int) -> int:
        # After t operations index i has absorbed t*y of decrement plus an
        # extra (x - y) every time it was the picked one, so candidate t is
        # feasible iff the required picks fit inside the t operations.
        def feasible(t: int) -> bool:
            base = t * y
            gain = x - y
            used = 0
            for value in nums:
                if value > base:
                    used += (value - base + gain - 1) // gain
                    if used > t:  # budget already blown
                        return False
            return True

        low, high = 1, (max(nums) + y - 1) // y  # never picking anyone suffices here
        while low < high:
            mid = (low + high) // 2
            if feasible(mid):
                high = mid
            else:
                low = mid + 1
        return low
