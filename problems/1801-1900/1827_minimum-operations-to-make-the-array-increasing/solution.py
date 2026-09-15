from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Strict increase forces each element to at least prev + 1, and
        # lifting an element any higher only raises the floor of the next
        # one, so the cheapest reachable target is exactly that floor.
        ops = 0
        prev = nums[0]
        for i in range(1, len(nums)):
            target = max(prev + 1, nums[i])
            ops += target - nums[i]
            prev = target
        return ops
