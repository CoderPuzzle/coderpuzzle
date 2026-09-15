from typing import List


class Solution:
    def wiggleSort(self, nums: List[int]) -> List[int]:
        # One pass: each pair demands its own relation, and repairing a
        # violated pair with a single swap never re-breaks the pair before it.
        for i in range(1, len(nums)):
            # Odd i demands nums[i-1] <= nums[i]; even i demands nums[i-1] >= nums[i].
            if (i % 2 == 1 and nums[i - 1] > nums[i]) or (i % 2 == 0 and nums[i - 1] < nums[i]):
                nums[i - 1], nums[i] = nums[i], nums[i - 1]
        return nums
