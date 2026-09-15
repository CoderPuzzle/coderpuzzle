from typing import List


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        # Each operation removes the current smallest element, so exactly the
        # values strictly below k are stripped away, one apiece; elements
        # >= k never leave. The total is just how many sit below k.
        count = 0
        for value in nums:
            if value < k:
                count += 1
        return count
