from typing import List


class Solution:
    def minNumber(self, nums1: List[int], nums2: List[int]) -> int:
        # A shared digit admits a one-digit number; the smallest shared digit
        # then beats anything with more digits.
        common = set(nums1) & set(nums2)
        if common:
            return min(common)
        # No overlap: the answer has two digits, and the tens digit is just
        # whichever array holds the globally smaller minimum.
        a = min(nums1)
        b = min(nums2)
        return min(10 * a + b, 10 * b + a)
