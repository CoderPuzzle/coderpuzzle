import random
from typing import List


class Solution:
    def countElements(self, nums: List[int], k: int) -> int:
        # The full sorted order is more than the answer needs: the count is
        # decided entirely by which values sit strictly below
        # sorted[n - k - 1]. Quickselect learns that one threshold value
        # without paying to order everything else.
        target = len(nums) - k - 1
        lo, hi = 0, len(nums) - 1
        while lo < hi:
            # A uniformly random pivot defeats adversarial inputs: every
            # partition is expected to shrink the window by a constant
            # factor, so the total work stays linear instead of degrading
            # to quadratic on sorted arrays.
            r = random.randint(lo, hi)
            nums[r], nums[hi] = nums[hi], nums[r]
            pivot = nums[hi]
            # Three-way (Dutch flag) split: values strictly below the
            # pivot move to the front block, values strictly above to the
            # back block, and the pivot's own run sits between them. A
            # run of equals leaves the window together, which is what
            # keeps heavily duplicated inputs fast.
            lt, i, gt = lo, lo, hi
            while i <= gt:
                if nums[i] < pivot:
                    nums[lt], nums[i] = nums[i], nums[lt]
                    lt += 1
                    i += 1
                elif nums[i] > pivot:
                    nums[i], nums[gt] = nums[gt], nums[i]
                    gt -= 1
                else:
                    i += 1
            # [lo, lt-1] < pivot, [lt, gt] == pivot, [gt+1, hi] > pivot;
            # keep only the block still covering the target index.
            if target < lt:
                hi = lt - 1
            elif target > gt:
                lo = gt + 1
            else:
                break
        threshold = nums[target]
        # Elements strictly below the threshold qualify wholesale; the run
        # AT it qualifies only when its strictly-greater count reaches k.
        less = equal = 0
        for value in nums:
            if value < threshold:
                less += 1
            elif value == threshold:
                equal += 1
        return less + equal if len(nums) - less - equal >= k else less
