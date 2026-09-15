from typing import List


class Solution:
    def sortTransformedArray(self, nums: List[int], a: int, b: int, c: int) -> List[int]:
        # f(x) = ax^2 + bx + c is a parabola, so its extreme transformed
        # values sit at the two ends of the sorted nums, not in the middle.
        # When a >= 0 the curve opens upward (a == 0 leaves a monotone line,
        # where the same discipline still holds): the largest values wait at
        # the ends, so the result fills from the back, each step consuming
        # the larger of f(nums[lo]) and f(nums[hi]). When a < 0 the parabola
        # is inverted, the smallest values sit at the ends, and the fill runs
        # from the front taking the smaller. |f(x)| <= 100*100^2 + 100*100 +
        # 100 = 1,010,100, well inside the 32-bit range.
        def f(x: int) -> int:
            return (a * x + b) * x + c

        result = [0] * len(nums)
        lo, hi = 0, len(nums) - 1
        index = len(nums) - 1 if a >= 0 else 0
        while lo <= hi:
            left, right = f(nums[lo]), f(nums[hi])
            take_left = left >= right if a >= 0 else left <= right
            result[index] = left if take_left else right
            if take_left:
                lo += 1
            else:
                hi -= 1
            index += -1 if a >= 0 else 1
        return result
