from typing import List


class Solution:
    def optimalDivision(self, nums: List[int]) -> str:
        # One or two values leave nothing to regroup, so the bare
        # left-to-right join is the whole answer. From three on, every value
        # is positive and the expression is maximized by dividing nums[0] by
        # the smallest possible denominator — the flat chain
        # a1/a2/.../an-1 = a1/(a2*...*an-1), which pulls every later value
        # into that denominator's numerator.
        if len(nums) <= 2:
            return "/".join(str(value) for value in nums)
        return str(nums[0]) + "/(" + "/".join(str(value) for value in nums[1:]) + ")"
