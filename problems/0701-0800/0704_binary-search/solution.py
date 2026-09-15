from typing import List, Optional


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Invariant: if the target exists, its index stays inside nums[lo..hi].
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                return mid
            # Each update also discards mid itself, so the interval at least
            # halves and the loop always terminates.
            if nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        # Bounds crossed: the candidate interval is empty, target absent.
        return -1
