from typing import List


class Solution:
    def maximumProduct(self, nums: List[int]) -> int:
        # Only two triples can hold the maximum: the three largest values,
        # or the largest value times the two smallest — two negatives whose
        # product is a big positive. Track all five extremes in one pass;
        # no sort needed.
        max1 = max2 = max3 = -float("inf")
        min1 = min2 = float("inf")
        for value in nums:
            if value >= max1:
                max3, max2, max1 = max2, max1, value
            elif value >= max2:
                max3, max2 = max2, value
            elif value > max3:
                max3 = value
            if value <= min1:
                min2, min1 = min1, value
            elif value < min2:
                min2 = value
        # n >= 3 replaces every sentinel, and any product of three values
        # bounded by 1000 in magnitude fits comfortably in a Python int.
        return max(max1 * max2 * max3, max1 * min1 * min2)
