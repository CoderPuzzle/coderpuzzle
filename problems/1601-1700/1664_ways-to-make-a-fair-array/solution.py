from typing import List, Optional


class Solution:
    def waysToMakeFair(self, nums: List[int]) -> int:
        # Removing index i leaves every earlier element on its own index
        # and slides every later one down a slot, flipping the suffix's
        # parity: the after-removal even sum is the prefix's even sum
        # plus the suffix's odd sum, and vice versa for odd. Four running
        # totals (even/odd sums of the visited prefix and of the
        # untouched suffix) test each candidate removal in O(1).
        left_even = left_odd = 0
        right_even = sum(nums[0::2])
        right_odd = sum(nums[1::2])
        count = 0
        for i, value in enumerate(nums):
            if i % 2 == 0:
                right_even -= value
            else:
                right_odd -= value
            if left_even + right_odd == left_odd + right_even:
                count += 1
            if i % 2 == 0:
                left_even += value
            else:
                left_odd += value
        return count
