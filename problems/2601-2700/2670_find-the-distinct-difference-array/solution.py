from typing import List


class Solution:
    def distinctDifferenceArray(self, nums: List[int]) -> List[int]:
        # One right-to-left pass records how many distinct values survive
        # after each index, then a left-to-right pass grows the prefix set,
        # so every diff is a single subtraction of two maintained counts.
        n = len(nums)
        suffix_distinct = [0] * n
        seen = set()
        for i in range(n - 1, -1, -1):
            # Visited values are exactly those right of i, so this records
            # the distinct count of nums[i + 1, ..., n - 1] itself.
            suffix_distinct[i] = len(seen)
            seen.add(nums[i])
        prefix_seen = set()
        result = []
        for i, value in enumerate(nums):
            prefix_seen.add(value)
            result.append(len(prefix_seen) - suffix_distinct[i])
        return result
