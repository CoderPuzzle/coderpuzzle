from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Hash map from value -> index: one pass answers "seen the complement?"
        # in O(1), replacing the nested brute-force scan.
        seen = {}
        for index, value in enumerate(nums):
            complement = target - value
            # Look up before inserting, so an element can never match itself
            # and the two returned indices are guaranteed distinct.
            if complement in seen:
                return [seen[complement], index]
            seen[value] = index
        # Statement promises a solution exists; empty is just the fallback.
        return []
