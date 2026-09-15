from typing import List


class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        # Greedy two pointers on block sums: the front block (nums[0..i])
        # must end up equal to the back block. While they differ, the
        # smaller side absorbs its next adjacent element — one merge, and
        # merging can never help the larger side catch up. Equal blocks
        # retire together and scanning continues inside.
        i, j = 0, len(nums) - 1
        left = right = 0
        ops = 0
        while i < j:
            if left == 0:
                left = nums[i]
            if right == 0:
                right = nums[j]
            if left == right:
                i += 1
                j -= 1
                left = right = 0
            elif left < right:
                i += 1
                left += nums[i]
                ops += 1
            else:
                j -= 1
                right += nums[j]
                ops += 1
        return ops
