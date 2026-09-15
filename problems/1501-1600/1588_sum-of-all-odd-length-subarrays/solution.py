from typing import List, Optional


class Solution:
    def sumOddLengthSubarrays(self, arr: List[int]) -> int:
        # For each index i, left = i + 1 choices for the subarray's start
        # and right = n - i choices for its end; among those left * right
        # subarrays through i, exactly ceil(left * right / 2) have odd
        # length. Sum arr[i] times that count over every index.
        n = len(arr)
        total = 0
        for i, value in enumerate(arr):
            left = i + 1
            right = n - i
            odd_count = (left * right + 1) // 2
            total += value * odd_count
        return total
