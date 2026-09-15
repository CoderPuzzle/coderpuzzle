from typing import List, Optional

import random


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # The kth largest sits at index n - k of the ascending-sorted
        # array; quickselect homes in on that target index.
        target = len(nums) - k
        lo, hi = 0, len(nums) - 1
        while lo < hi:
            # A uniformly random pivot defeats adversarial inputs: every
            # partition is expected to shrink the range by a constant
            # factor, so the total work stays linear instead of
            # degrading to quadratic on sorted or all-equal arrays.
            r = random.randint(lo, hi)
            nums[r], nums[hi] = nums[hi], nums[r]
            pivot = nums[hi]
            store = lo
            # Lomuto sweep: values strictly below the pivot land left of
            # `store`; duplicates ride the right side.
            for j in range(lo, hi):
                if nums[j] < pivot:
                    nums[j], nums[store] = nums[store], nums[j]
                    store += 1
            nums[store], nums[hi] = nums[hi], nums[store]
            # nums[store] is now in its final sorted position; keep only
            # the side that still contains the target index.
            if store == target:
                return nums[store]
            if store < target:
                lo = store + 1
            else:
                hi = store - 1
        return nums[target]
