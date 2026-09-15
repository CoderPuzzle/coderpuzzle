from typing import List


class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # One sweep keeps the two largest and the two smallest values. Those
        # four slots always contain the two elements of largest magnitude:
        # absolute values are V-shaped across a sorted array, so both winners
        # come off its ends.
        max1 = max2 = -(10**18)
        min1 = min2 = 10**18
        for value in nums:
            if value > max1:
                max1, max2 = value, max1
            elif value > max2:
                max2 = value
            if value < min1:
                min1, min2 = value, min1
            elif value < min2:
                min2 = value
        # The optimal triple is the mandatory replacement pushed to +-10^5
        # (its sign matched to the pair) times the most extreme pair product.
        extremes = (max1, max2, min1, min2)
        best_pair = 0
        for i in range(4):
            for j in range(i + 1, 4):
                best_pair = max(best_pair, abs(extremes[i] * extremes[j]))
        return 100000 * best_pair
