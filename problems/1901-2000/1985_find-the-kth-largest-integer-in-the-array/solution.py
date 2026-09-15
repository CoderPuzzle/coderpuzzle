from typing import List


class Solution:
    def kthLargestNumber(self, nums: List[str], k: int) -> str:
        # A string of more digits is always the larger integer, so ordering
        # by length first and lexicographically second is numeric order.
        nums.sort(key=lambda s: (len(s), s))
        return nums[len(nums) - k]
