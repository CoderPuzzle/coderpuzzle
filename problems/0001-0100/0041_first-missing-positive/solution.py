from typing import List, Optional


class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        # Work on a copy so the caller's list is never mutated.
        nums = list(nums)
        n = len(nums)
        # The answer lies in [1, n+1], so value v "belongs" at index v-1:
        # cyclic-sort each in-range value into its home slot.
        for i in range(n):
            # Swap while nums[i] is a positive in [1, n] whose home slot does
            # not already hold it. The != guard also makes duplicates harmless:
            # a duplicate finds its target occupied and stops swapping.
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                target = nums[i] - 1
                nums[i], nums[target] = nums[target], nums[i]
        # Every swap places one value in its final position and none ever
        # leaves its slot, so total swaps <= n: O(n) amortized despite nesting.
        for i in range(n):
            # First slot not holding its own value reveals the smallest
            # missing positive; all of 1..n present means the answer is n+1.
            if nums[i] != i + 1:
                return i + 1
        return n + 1
