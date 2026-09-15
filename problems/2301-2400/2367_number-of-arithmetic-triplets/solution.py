from typing import List


class Solution:
    def arithmeticTriplets(self, nums: List[int], diff: int) -> int:
        # A triplet is fully determined by its middle element j: the array is
        # strictly increasing, so nums[i] = nums[j] - diff and
        # nums[k] = nums[j] + diff exist at exactly one position each — and
        # membership in the value set is all that matters.
        seen = set(nums)
        return sum(1 for value in nums if value - diff in seen and value + diff in seen)
