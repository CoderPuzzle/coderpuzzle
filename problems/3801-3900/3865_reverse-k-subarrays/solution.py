from typing import List, Optional


class Solution:
    def reverseSubarrays(self, nums: List[int], k: int) -> List[int]:
        # Each block holds m = n // k elements. A two-pointer sweep swaps
        # the ends of a block inward, mirroring the "Two Pointers" tag, and
        # the blocks are visited left to right; the copy keeps the input
        # array untouched.
        m = len(nums) // k
        result = list(nums)
        for start in range(0, len(nums), m):
            i, j = start, start + m - 1
            while i < j:
                result[i], result[j] = result[j], result[i]
                i += 1
                j -= 1
        return result
