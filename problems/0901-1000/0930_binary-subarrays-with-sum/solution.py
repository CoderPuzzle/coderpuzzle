from typing import List


class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        # A subarray's sum is the difference of two prefix sums, so the
        # windows ending here with sum goal pair exactly with the earlier
        # prefixes worth prefix - goal. A hash map counting each prefix sum
        # seen so far answers that lookup in O(1) per position.
        count = 0
        prefix = 0
        seen = {0: 1}
        for value in nums:
            prefix += value
            count += seen.get(prefix - goal, 0)
            seen[prefix] = seen.get(prefix, 0) + 1
        return count
