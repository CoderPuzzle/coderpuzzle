from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # One operation on the whole array replaces every element with
        # their common bitwise AND, so any array equalizes in at most one
        # step; zero steps suffice only when it already is constant.
        return 0 if all(x == nums[0] for x in nums) else 1
