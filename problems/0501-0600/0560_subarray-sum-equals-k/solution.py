from typing import List, Optional


class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        # Seed with the empty prefix so subarrays starting at index 0 are counted.
        prefix_counts = {0: 1}
        running = 0
        total = 0
        for value in nums:
            running += value
            # Subarrays ending here sum to k exactly when an earlier prefix equals running - k.
            total += prefix_counts.get(running - k, 0)
            # Record only after counting, so a subarray never matches against itself.
            prefix_counts[running] = prefix_counts.get(running, 0) + 1
        return total
