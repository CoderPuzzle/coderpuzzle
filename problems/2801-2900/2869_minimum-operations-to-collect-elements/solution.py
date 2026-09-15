from typing import List


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        # Operations only ever drop the last element, so after t operations
        # the collection is exactly the suffix of length t.
        marked = [False] * (k + 1)
        collected = 0
        for i in range(len(nums) - 1, -1, -1):
            if nums[i] <= k and not marked[nums[i]]:
                marked[nums[i]] = True
                collected += 1
                if collected == k:
                    # The wanted values 1..k all sit in the removed suffix.
                    return len(nums) - i
        # Unreachable for valid inputs: 1..k is guaranteed collectible.
        return len(nums)
